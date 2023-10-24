import { Guest } from "~/types/guests.d";
import { supabaseClient } from "./supabase";

export async function getGuests() {
    let { data, error } = await supabaseClient.from('guests').select('*');
    
    if(error) throw new Error(error.message);

    return data
}

export async function getGuestsById(guestId:number){
    let { data, error } = await supabaseClient.from('guests').select('*').eq('id', guestId);
    
    if(error) throw new Error(error.message);
    
    return data 
}

export async function deleteGuest(guestId:number){
    let { error } = await supabaseClient
    .from('guests')
    .delete()
    .eq('id',guestId);

    if(error) throw new Error(error.message);

}

export async function updateGuest(guest:{guestId:number,updatedGuest:Partial<Guest>}){
    const {updatedGuest,guestId} = guest;
    
    let { error } = await supabaseClient
    .from('guests')
    .update(updatedGuest)
    .eq('id',guestId);

    if(error) throw new Error(error.message)

}