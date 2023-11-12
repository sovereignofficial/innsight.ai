import { toast } from 'react-toastify';
import { differenceInDays, parseISO, addDays, format, getDaysInMonth, startOfMonth } from "date-fns";
import { Booking } from '~/types/bookings.d';
import { ToastInterface, toastStates } from '~/types/toast.d';
import { Cabin } from '~/types/cabins.d';
import { AES } from 'crypto-js';
import Utf8 from 'crypto-js/enc-utf8';
import { secretKey } from '~/services/supabase';

//theme
export const getTheme = () => {
    const theme = localStorage.getItem('theme');
    const classList = document.documentElement.classList;
    theme === 'dark' ? classList.add(`${theme}`) : classList.remove('dark')
    return theme
}
export const setTheme = (theme: 'light' | 'dark') => {
    localStorage.setItem('theme', theme);
    const classList = document.documentElement.classList
    return theme === 'dark' ? classList.add('dark') : classList.remove('dark')
}


//number generator
export function getRandomNumber(threshold: number): number {
    return Math.floor(Math.random() * threshold);
}

// arrange date time

export function generateRandomDates(daysToAdd: number, createdDaysBefore: number): { startDate: string, endDate: string, created_at: string } {
    // Get the current date
    const currentDate = new Date();

    // Get the first day of the current month
    const firstDayOfCurrentMonth = startOfMonth(currentDate);

    // Calculate the maximum number of days to add from the start of the month
    const maxDaysToAdd = getDaysInMonth(currentDate) - 1;

    // Generate a random number between 0 and 30 (or the maximum possible days)
    const randomDays = Math.min(Math.floor(Math.random() * (maxDaysToAdd + 1)), 30);

    // Calculate the startDate by adding randomDays to the first day of the current month
    const startDate = addDays(firstDayOfCurrentMonth, randomDays);

    // Calculate the endDate by adding daysToAdd to the startDate
    const endDate = addDays(startDate, daysToAdd);

    // Calculate the created_at date by subtracting createdDaysBefore from startDate
    const created_at = addDays(startDate, -createdDaysBefore);

    return {
        startDate: format(startDate, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        endDate: format(endDate, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        created_at: format(created_at, "yyyy-MM-dd'T'HH:mm:ssxxx"),
    };
}


type OptionsType = { end: boolean }

export const getToday = function (options: OptionsType) {
    const today = new Date();

    if (options?.end)
        // Set to the last second of the day
        today.setUTCHours(23, 59, 59, 999);
    else today.setUTCHours(0, 0, 0, 0);
    return today.toISOString();
};


export const subtractDates = (dateStr1: string, dateStr2: string) =>
    differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));


const millisecondsPerDay = 86400000;

export const handleBookingDates = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const { formattedStartDate, formattedEndDate } = formatDates(start, end)

    const numberOfStays = getNumberOfStays(start, end);
    const arrivingInfo = calculateArrivingTime(start);

    const arrive = arrivingInfo > 0 ? `In ${arrivingInfo} days` : `${-arrivingInfo} days ago`
    return {
        formattedStartDate,
        formattedEndDate,
        bookingInfo: {
            arrive,
            numberOfStays
        }
    }
}


const formatDates = (startDate: Date, endDate: Date) => {
    const formattedStartDate = startDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
    const formattedEndDate = endDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
    return { formattedStartDate, formattedEndDate }
}

const getNumberOfStays = (startDate: Date, endDate: Date): number => {
    const numberOfStays = Math.ceil((endDate.getTime() - startDate.getTime()) / millisecondsPerDay);
    return numberOfStays
}

const calculateArrivingTime = (startDate: Date): number => {
    const today = new Date();

    const inceptionRemain = Math.ceil((startDate.getTime() - today.getTime()) / millisecondsPerDay);
    return inceptionRemain
}


//comparators
export const newDateComparator = (a: string, b: string) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateB.getTime() - dateA.getTime();
}

export const oldDateComparator = (a: string, b: string) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA.getTime() - dateB.getTime();
}

// search algorithm 
export const recursiveBinarySearchByDiscount = (table: Cabin[], withDiscount: boolean, low: number, high: number, result: Cabin[] = []): Cabin[] => {

    if (low > high) {
        return result
    }

    const noDiscountValue = 0;

    //sort the table by discount value
    table.sort((row1: Cabin, row2: Cabin) => row1.discount - row2.discount);


    const mid = Math.floor((low + high) / 2);

    const discountValue = table[mid].discount;

    if (withDiscount) {
        if (discountValue > noDiscountValue) {
            result.push(table[mid]);
            const filteredCabins = table.filter(item => item.id !== table[mid].id);
            return recursiveBinarySearchByDiscount(filteredCabins, withDiscount, 0, filteredCabins.length - 1, result)
        }
        else {
            return recursiveBinarySearchByDiscount(table, withDiscount, mid + 1, table.length - 1, result);
        }
    } else {
        if (discountValue == noDiscountValue) {
            result.push(table[mid]);
            const filteredCabins = table.filter(item => item.id !== table[mid].id);
            return recursiveBinarySearchByDiscount(filteredCabins, withDiscount, low, filteredCabins.length - 1, result)
        }
        else {
            return recursiveBinarySearchByDiscount(table, withDiscount, low, mid - 1, result);
        }
    }
}

export const recursiveBinarySearchByStatus = (table: Booking[], targetStatus: string, low: number, high: number, result: Booking[] = []): Booking[] => {

    //stop call
    if (low > high) {
        return result;
    }

    // Custom comparator function that compares two strings alphabetically
    const comparator = (row1: Booking, row2: Booking): number => {
        return row1.status.localeCompare(row2.status);
    };
    table.sort(comparator);

    const mid = Math.floor((low + high) / 2);

    const status = table[mid].status;

    if (targetStatus === status) {
        result.push(table[mid]);
        const filteredBookings = table.filter(item => item.id !== table[mid].id);
        return recursiveBinarySearchByStatus(filteredBookings, targetStatus, 0, filteredBookings.length - 1, result);
    } else {
        if (targetStatus > status) {
            return recursiveBinarySearchByStatus(table, targetStatus, mid + 1, table.length - 1, result)
        } else {
            return recursiveBinarySearchByStatus(table, targetStatus, low, mid - 1, result)
        }
    }
}

//auth
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

export const isValidEmail = (email: string): boolean => {
    return emailRegex.test(email);
}

export const isValidPassword = (password: string): boolean => {
    return passwordRegex.test(password);
}


//toastify

const toastPosition = toast.POSITION.BOTTOM_LEFT;

export const initiateToast = ({ state, message }: ToastInterface) => {
    switch (state) {
        case toastStates.ERROR:
            toast.error(message, {
                position: toastPosition
            })
            break;
        case toastStates.INFO:
            toast.info(message, {
                position: toastPosition
            })
            break;
        case toastStates.SUCCESS:
            toast.success(message, {
                position: toastPosition
            })
            break;

        case toastStates.WARN:
            toast.warn(message, {
                position: toastPosition
            })
            break;
        default:
            break;
    }
}

//chatId encryption
export const encryptChatURI = (chatId:number) => {
    const encryptedId = AES.encrypt(chatId.toString(), secretKey).toString();
    let encodedURI = encodeURIComponent(encryptedId);
    return encodedURI
}

export const decryptChatURI = (encryptedChatId: string) => {
    const decodedURI = decodeURIComponent(encryptedChatId);
    const decryptedBytes = AES.decrypt(decodedURI, secretKey);
    const decryptedChatId = decryptedBytes.toString(Utf8);
    return Number(decryptedChatId);
}

