import { User } from "@supabase/supabase-js"

export type InnSightUser = {
    id:string,
    fullName:string,
    email:string,
    avatar:string,
}
export type Message = {
    id?:number,
    created_at?:string,
    sendBy:InnSightUser,
    createdDate:string,
    message:string,
    chatId:number 
}
export type MessagingChatStates = {
    isAiVoiceEnabled:boolean,
    isAiTyping:boolean,
    isConversationStarted:boolean,
    isMicOpen:boolean,
    messageValue:string,
    currentChat:Chat | null,
    messages:Message[],
}

export type Chat = {
    id?:number,
    created_at?:string,
    title:string,
    messageId:number | null,
}