import { Cabin } from "~/types/cabins.d";
import { supabaseClient } from "./supabase";

export async function getCabins() {
    let { data, error } = await supabaseClient.from('cabins').select('*');

    if (error) throw new Error(error.message);

    return data as Cabin[]
}

export async function getCabinById(cabinId: number) {
    let { data, error } = await supabaseClient.from('cabins').select('*').eq('id', cabinId);

    if (error) throw new Error(error.message);

    return data ? data[0] as Cabin : null;
}

export async function deleteCabins(id: number) {
    let { error } = await supabaseClient.from('cabins').delete().eq('id', id);

    if (error) throw new Error(error.message);
}

export async function insertCabin({ name, regularPrice, discount, description, image, maxCapacity }: Cabin) {

    if (!name.trim()) throw new Error("Please type a cabin name!");
    if (!regularPrice) throw new Error('Please define a price for cabin!');
    if (!discount) throw new Error('Please define a discount or type 0 dollars instead!');
    if (!description.trim()) throw new Error('Please add a description of cabin!');
    if (!image?.trim()) throw new Error('Please add an image of cabin!');
    if (!maxCapacity) throw new Error('Please type capacity of cabin!');

    let { data, error } = await supabaseClient.from('cabins').insert({
        name,
        regularPrice,
        discount,
        description,
        image,
        maxCapacity
    });

    if (error) throw new Error(error.message);

    return data ? data as Cabin[] : [];
}

export async function updateCabin(updateData: { cabinId: number | undefined, newValues: Partial<Cabin> }) {
    const { name, regularPrice, discount, description, image, maxCapacity,isFull } = updateData.newValues;

    if (!name?.trim()) throw new Error("Please type a cabin name!");
    if (!regularPrice) throw new Error('Please define a price for cabin!');
    if (!discount && discount !== 0) throw new Error('Please define a discount or type 0 dollars instead!');
    if (!description?.trim()) throw new Error('Please add a description of cabin!');
    if (!image?.trim()) throw new Error('Please add an image of cabin!');
    if (!maxCapacity) throw new Error('Please type capacity of cabin!');

        let { data, error } = await supabaseClient.from('cabins').update({
            name,
            regularPrice,
            discount,
            description,
            image,
            maxCapacity,
            isFull
        }).eq('id', updateData.cabinId);

        if (error) throw new Error(error.message)

        return data ? data as Cabin[] : [];
}
