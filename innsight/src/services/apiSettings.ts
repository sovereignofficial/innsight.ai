import { SettingsType } from "~/types/settings.d";
import { supabaseClient } from "./supabase";

export async function getSettings():Promise<SettingsType>{
    let { data, error } = await supabaseClient.from('settings').select('*');
    
    if(error) throw new Error(error.message);
    if(!data) throw new Error('Data could not fetched.')
    
    return data ?  data[0] : null
}

export async function updateSettings(settingsId:number,{minBookingLength,maxBookingLength,maxGuestsPerBooking,breakfastPrice}:Partial<SettingsType>){
    if(!minBookingLength)throw new Error('Please type minimum booking length!');
    if(!maxBookingLength)throw new Error('Please type max booking length!');
    if(!maxGuestsPerBooking)throw new Error('Please type max guests amount!');
    if(!breakfastPrice)throw new Error('Please type breakfastPrice!');
    let { error } = await supabaseClient.from('settings').update({
        minBookingLength,
        maxBookingLength,
        maxGuestsPerBooking,
        breakfastPrice
    }).eq('id', settingsId);
    
    if(error) throw new Error(error.message);
}