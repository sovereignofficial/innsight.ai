import { User } from "@supabase/supabase-js";
import { supabaseClient } from "./supabase";
import { Chat,Message } from "~/types/messaging.d";

export async function getChats():Promise<Chat[]>{
    const {data, error} = await supabaseClient
    .from('chats')
    .select('*')

    if(error) throw new Error(error.message);

    return data.reverse();
}

export async function createChat(chat:Chat){
    //create new chat type
    const { error } = await supabaseClient
    .from('chats')
    .insert(chat);

    if(error) throw new Error(error.message);

    const {data:newChat,error:newChatError} = await supabaseClient
    .from('chats')
    .select('*')
    .eq('title',chat.title)
    
    if(newChatError) throw new Error(newChatError.message);
    
    return newChat[0] as Chat;
}

export async function updateChat(chatId:number,updatedChat:Chat){
    const { error } = await supabaseClient
    .from('chats')
    .update(updatedChat)
    .eq('id',chatId);

    if(error) throw new Error(error.message);
}


export async function getMessages(chatId:number):Promise<Message[]>{
    const {data,error} = await supabaseClient
    .from('messages')
    .select('*')
    .eq('chatId',chatId);

    if(error) throw new Error(error.message);


    const { data: { users }, error:usersError } = await supabaseClient.auth.admin.listUsers();

    if(usersError) throw new Error(usersError.message);

    const messages:Message[] = data.map(message =>{
        const user = users.find((user:User) => user.id === message.user_id);

        const newMessage:Message = {
            ...message,
            sendBy:{
                id:user?.id,
                avatar:user?.user_metadata.avatar,
                fullName:user?.user_metadata.fullName,
                email:user?.email
            }
        }
        return newMessage;
    })
    return messages;
}

export async function insertMessage(newMessage:Message){
    const { message,createdDate,chatId,sendBy} = newMessage;
    
    const {error} = await supabaseClient
    .from('messages')
    .insert({message,chatId,createdDate,user_id:sendBy.id});
    
    if(error) throw new Error(error.message);

    const {data:myMessage,error:messageError} = await supabaseClient
    .from('messages')
    .select('*')
    .eq('createdDate',createdDate);

    if(messageError)throw new Error(messageError.message);

    return myMessage[0] as Message
}
