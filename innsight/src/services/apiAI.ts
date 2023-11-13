import OpenAI from 'openai';
import { supabaseClient } from "./supabase";
import { generateRandomDates, getRandomNumber } from "~/utils/helpers";
import { isFuture, isPast, isToday } from "date-fns";
import { getCabins } from "./apiCabins";
import { getGuests } from "./apiGuests";
import { Booking, BookingStates, BookingStatus } from '~/types/bookings.d';
import { Cabin } from '~/types/cabins.d';
import { Guest } from '~/types/guests.d';
import { SettingsType } from '~/types/settings.d';
import EventEmitter from 'events';

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_KEY,
    dangerouslyAllowBrowser: true
});

export const emitter = new EventEmitter();

export const runGptStream = async (prompt: string) => {
    try {
        if (!prompt) throw new Error("Please add your prompt before you sending a request to gpt-3.5-turbo!");

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{
                "role": "system",
                "content": "You're an helpful assistan. Your name is InnSight."
            },
            {
                "role": "user",
                "content": `${prompt}
                `
            }
            ],
            stream:true
        })

        const reader = response.toReadableStream().getReader();
        const decoder = new TextDecoder("utf-8");
        let resultText = "";

        let buffer = "";

        while(true){
            const {done,value} = await reader.read();
            if(done){
                break;
            }
        
            const chunk = decoder.decode(value);
            buffer += chunk;
        
            let boundary = buffer.lastIndexOf("\n");
            if (boundary === -1) continue;
        
            let text = buffer.substring(0, boundary);
            buffer = buffer.substring(boundary + 1);
        
            const lines = text.split("\n");
            const parsedLines = lines
              .map((line) => line.replace(/^data: /, "").trim()) // Remove the "data: " prefix
              .filter((line) => line !== "" && line !== "[DONE]") // Remove empty lines and "[DONE]"
              .map((line) => JSON.parse(line)); // Parse the JSON string
        
              for (const parsedLine of parsedLines) {
                const { choices } = parsedLine;
                const { delta } = choices[0];
                const { content } = delta;
                // Update the UI with the new content
                if (content) {
                  resultText += content;
                  emitter.emit('assistantMessage',resultText)
                }
              }
        }
        
    }
    catch (err) {
        console.error(err)
    }
}

const askToGPT = async (prompt: string) => {
    try {
        if (!prompt) throw new Error("Please add your prompt before you sending a request to gpt-3.5-turbo!");

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{
                "role": "system",
                "content": "You're an helpful assistant."
            },
            {
                "role": "user",
                "content": `${prompt}
                * The data should be in JSON array
                * Do not type any disclaimers,warnings. Just give the json array data.
                * Do not explain anything.
                * Every data must be different from each other.
                `
            }
            ]
        })

        const message = response.choices[0].message.content;

        return message
    }
    catch (err) {
        console.error(err)
    }
}

const generateImagesByDALLE = async (prompt: string) => {
    const response = await openai.images.generate({
        prompt,
        n: 5,
        size: '256x256'
    });
    const image_urls = response.data;
    return image_urls
}

export const createGuestsByAI = async (guests: Guest[]) => {
    //send api request to AI
    const guestNames = JSON.stringify([...guests.map(guest => {
        return guest.fullName
    })]);

    const message = await askToGPT(`Please create 10 more guests data for hotel in this schema:
                type Guest:{
                    "created_at": string,
                    "fullName": string,
                    "email": string,
                    "nationality": string,
                    "countryTwoLetterCode": string,
                    "nationalID": string
                }
                *Please don't repeat these names from:${guestNames}
    `);

    let parsedMessage = JSON.parse(message!);

    //change countryCode properties to countryFlag
    const newGuests = [...parsedMessage.map((chunk: Partial<Guest> & { countryTwoLetterCode?: string }) => {
        let createdDate = new Date(chunk.created_at!)
        let guest = {
            ...chunk,
            created_at: createdDate,
            countryFlag: `https://flagcdn.com/${chunk.countryTwoLetterCode?.toLowerCase()}.svg`
        }
        delete guest.countryTwoLetterCode;
        return guest
    })]

    //insert data that generated by ai to supabase
    const { error } = await supabaseClient.from('guests').insert(newGuests);

    if (error) throw new Error(error.message);
};

export const createCabinsByAI = async (cabins: Cabin[]) => {
    //generate a cabin image by DALL-E
    const images = await generateImagesByDALLE('a wonderful resort cabin with luxury goods and pool view in sunset');

    const cabinNames = JSON.stringify([...cabins.map(cabin => {
        return cabin.name
    })]);

    //send api request to AI
    const message = await askToGPT(`Please create 5 more resort hotel cabins in this schema:
    type Cabin = {
        "created_at": string
        "name": string(4 digits number as string)
        "maxCapacity": number(Capacity of guest amount)
        "regularPrice": number,
        "discount": number,
        "description": string
    }
    *Please don't repeat these names from:${cabinNames}
    `);
    const parsedMessage: Partial<Cabin>[] = JSON.parse(message!)

    let newCabins = [];
    for (let i = 0; i < parsedMessage.length; i++) {
        let cabin = {
            ...parsedMessage[i],
            image: images[i].url
        }
        newCabins.push(cabin);
    }

    //insert data to supabase
    const { error } = await supabaseClient.from('cabins').insert(newCabins);

    if (error) throw new Error(error.message);

};


export const createBooking = (cabin: Cabin, guest: Guest, settings: SettingsType) => {

    function getRandomBoolean(): boolean {
        return Math.random() < 0.5; // Adjust the threshold for desired probability
    }
    const numGuests = getRandomNumber(settings.maxGuestsPerBooking);
    const numNigths = getRandomNumber(settings.maxBookingLength);
    const { startDate, endDate, created_at } = generateRandomDates(numNigths,getRandomNumber(settings.maxBookingLength));
    const cabinPrice = numNigths * (cabin.regularPrice - cabin.discount);
    const hasBreakfast = getRandomBoolean();
    const extrasPrice = hasBreakfast
        ? numNigths * settings.breakfastPrice * numGuests
        : 0; // hardcoded breakfast price
    const totalPrice = cabinPrice + extrasPrice;

    let isPaid = false;
    let status: BookingStatus = BookingStates.UNCONFIRMED;
    let checkInDate = null;
    let checkOutDate = null;

    if (
        isPast(new Date(endDate)) &&
        !isToday(new Date(endDate))
    ) {
        status = BookingStates.CHECKEDOUT;
        isPaid = true;
        checkOutDate = created_at
    }
    if (
        isFuture(new Date(startDate)) ||
        isToday(new Date(startDate))
    ) {
        status = BookingStates.UNCONFIRMED;
        isPaid = false;
    }
    if (
        (isFuture(new Date(endDate)) ||
            isToday(new Date(endDate))) &&
        isPast(new Date(startDate)) &&
        !isToday(new Date(startDate))
    ) {
        status = BookingStates.CHECKEDIN;
        isPaid = true;
        checkInDate = created_at
    }

    let newBooking: Booking = {
        created_at,
        startDate,
        endDate,
        checkInDate,
        checkOutDate,
        numNigths,
        cabinPrice,
        extrasPrice,
        totalPrice,
        status,
        isPaid,
        hasBreakfast,
        cabinId: cabin.id,
        guestId: guest.id,
        numGuests: numGuests
    };
    return newBooking;
}

export async function createTemplateBookings(settings: SettingsType) {
    const allCabins = await getCabins();
    const availableCabins = allCabins.filter(cabin => cabin.isFull !== true);
    if (availableCabins.length < 1) throw new Error('All cabins are full! Please try again later!')

    const guests = await getGuests();
    const newBookings: Booking[] = [];


    while (availableCabins.length > 0) {
        const cabinIndex = getRandomNumber(availableCabins.length);
        const cabin = availableCabins[cabinIndex];
        const guest = guests![getRandomNumber(guests?.length!)]
        const newBooking = createBooking(cabin, guest, settings);
        newBookings.push(newBooking)
        availableCabins.splice(cabinIndex, 1);
    }


    const fullCabins = newBookings.map(booking => {
        return {
            id: booking.cabinId,
            isFull: booking.status === BookingStates.CHECKEDOUT ? false : true
        }
    });

    const { error: updateCabinsError } = await supabaseClient
        .from('cabins')
        .upsert(fullCabins);

    if (updateCabinsError) throw new Error(updateCabinsError.message);

    const { error } = await supabaseClient.from("bookings").insert(newBookings);
    if (error) console.error(error.message);
}
