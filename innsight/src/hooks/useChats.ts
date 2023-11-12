import { useMutation, useQuery } from "@tanstack/react-query";
import { useReduxDispatch } from "./reduxHooks"
import { getChats, getMessages } from "~/services/apiAssistant";
import {  setCurrentChat, updateMessages } from "~/redux/slices/messagingSlice";
import { useErrorHandler } from "./useErrorHandler";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { decryptChatURI } from "~/utils/helpers";

export const useChats = () => {
    const dispatch = useReduxDispatch();
    const {handleError} = useErrorHandler();
    const [searchParams] = useSearchParams();
    const encryptedChatId =searchParams.get('c');

    const { data:chatHistory, isLoading: isChatsLoading} = useQuery({
        queryKey: ['get-chats'],
        queryFn: getChats,
    });

    const {isPending: isMessagesLoading, mutate: getMessagesFromChat } = useMutation({
        mutationKey: ['get-messages'],
        mutationFn: getMessages,
        onError: (err) => { handleError(err) },
        onSuccess:(res)=>{
            dispatch(updateMessages(res))
        }
    });

     //set chat
     useEffect(() => {
        if (encryptedChatId && chatHistory) {
            const chatId= decryptChatURI(encryptedChatId);
            const chat = chatHistory?.find(item => item.id === Number(chatId));
            chat && dispatch(setCurrentChat(chat));
            chat && getMessagesFromChat(Number(chatId))
        }
    }, [encryptedChatId, chatHistory]);

    return {isMessagesLoading,isChatsLoading,chatHistory,getMessagesFromChat}
}