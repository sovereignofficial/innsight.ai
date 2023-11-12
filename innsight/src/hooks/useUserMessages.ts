import { createChat, insertMessage, updateChat } from "~/services/apiAssistant";
import { useReduxDispatch, useReduxSelector } from "./reduxHooks";
import { setCurrentChat, updateMessageValue } from "~/redux/slices/messagingSlice";
import { useNavigate } from "react-router-dom";
import { useErrorHandler } from "./useErrorHandler";
import { useMutation } from "@tanstack/react-query";
import { Chat, Message } from "~/types/messaging.d";
import { navigateToEncryptedChatUrl } from "~/components/assistant/chat/HistoryListItem";

export const useUserMessages = () => {
    const dispatch = useReduxDispatch();
    const { currentChat } = useReduxSelector(st => st.messagingReducer);
    const navigate = useNavigate();
    const { handleError } = useErrorHandler();

    const saveMessageToDbHandler = async (newMessage:Message) => {
        if (!currentChat) {
            const newChat: Chat = {
                title: newMessage.message,
                messageId: null
            }
            const data = await createChat(newChat);
            const updatedMessage = { ...newMessage, chatId: data?.id! };
            const sentMessage = await insertMessage(updatedMessage);
            await updateChat(data.id!, { ...data, messageId: sentMessage.id! })
            dispatch(setCurrentChat(data.id))
           data.id && navigateToEncryptedChatUrl(data.id,navigate);
        } else {
            await insertMessage(newMessage);
            await updateChat(currentChat.id!, { ...currentChat })
        }
    }
    

    const { mutate: saveMessageToDb, isPending: isMessageSending, isSuccess: isMessageSent } = useMutation({
        mutationKey: ['send-message'],
        mutationFn: saveMessageToDbHandler,
        onError: (err) => {
            handleError(err) 
            console.error(err)
        },
        onSuccess: async () => {
            dispatch(updateMessageValue(""));
        }
    })

    return { saveMessageToDb, isMessageSending, isMessageSent }
}