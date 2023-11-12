import { useEffect, useState } from "react";
import { useReduxDispatch, useReduxSelector } from "./reduxHooks";
import { emitter, runGptStream } from "~/services/apiAI";
import { Message } from "~/types/messaging.d";
import { setIfAiTyping, updateMessage } from "~/redux/slices/messagingSlice";
import { useErrorHandler } from "./useErrorHandler";
import { useMutation } from "@tanstack/react-query";
import { insertMessage } from "~/services/apiAssistant";
import { format } from "date-fns";
import { useCabins } from "./useCabins";
import { useBookings } from "./useBookings";
import { useGuest } from "./useGuests";
import { playPollySpeech } from "~/services/amazon";



export const useAssistantMessages = () => {
    const dispatch = useReduxDispatch();
    const { isAiTyping, currentChat, messages, isAiVoiceEnabled } = useReduxSelector(st => st.messagingReducer)
    const { handleError } = useErrorHandler();
    const [lastMessage, setLastMessage] = useState<Message | null>(null);
    const [prompt, setPrompt] = useState('');
    const [assistantMessage, setAssistantMessage] = useState('');
    const [previousAsMsg, setPreviousAsMsg] = useState(assistantMessage);
    const [createdDate, setCreatedDate] = useState(format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx"));
    const { cabins } = useCabins();
    const { bookings } = useBookings();
    const { guests } = useGuest();
    const uimg = import.meta.env.VITE_SUPABASE_AI_AVATAR;
    const uuid = import.meta.env.VITE_SUPABASE_AI_USER_UID;

    const { mutate: sendAiMsgToDb } = useMutation({
        mutationKey: ['send-assistantmsg-db'],
        mutationFn: insertMessage,
        onError: (err) => { handleError(err) },
        onSuccess: () => {

        }
    })

    useEffect(() => {
        const handleAssistantMessage = (message: string) => {
            setAssistantMessage(message);
        }
        isAiTyping && emitter.on('assistantMessage', handleAssistantMessage);
        return () => {
            emitter.off('assistantMessage', handleAssistantMessage);
        }
    }, [isAiTyping]);

    const detectIfUserSendMessage = (history: Message[]) => {
        const lastMessage = history[history.length - 1]
        if (lastMessage.sendBy.id !== uuid) {
            const innSightPrompt = `
                Prompt:${lastMessage.message}    
                hotelData:{
                    resortGuests:${JSON.stringify(guests?.slice(-3))}
                    resortCabins:${JSON.stringify(cabins?.slice(-3))}
                    resortBookings:${JSON.stringify(bookings?.slice(-3))}
                    conversationHistoryWithUser:${JSON.stringify(messages.slice(-3))}
                }
                Rules => 
                * You have the last 3 days of hotel activity, last 3 guests and last 3 cabins added data. If the user asks previous data than last 3 bookings-guests-cabins, then ask for update their subscription.
                * For booking recommendations, you can provide the booking history and guest information as part of the prompt.
                * For guest inquiries, you can provide the guest's question as the newQuestion parameter in the prompt.
                * For mentioning about cabins, please ignore the image address of cabin data. You don't need to share that info with user.
                * For analyzing bookings in a given time period, you can provide the bookings variable as part of the prompt.
                * For sales analysis, you can provide sales data as part of the prompt.
                * For analyzing which cabins are mostly used, you can provide cabin usage data as part of the prompt.
                * You have conversation history with user, whenever you need it, you can leveraging of those json array of messages,bookings,cabins,guests data, if user need.
                * The user that is asking questions to you is resort staff or manager. You can share data with them without any doubt.
            `
            setPrompt(innSightPrompt);
            setLastMessage(lastMessage);
        } else {
            setLastMessage(null);
            setPrompt('');
        }
    }
    const runAssistantAnswer = async (prompt: string) => {
        if (lastMessage) {
            setCreatedDate(format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx"));
            dispatch(setIfAiTyping(true));
            try {
                await runGptStream(prompt);
            } catch (err) {
                handleError(err);
            } finally {
                dispatch(setIfAiTyping(false));
                setLastMessage(null);
                setAssistantMessage("");
                setPreviousAsMsg("");
            }
        }
    }

    useEffect(() => {
        const fetchAnswer = async () => {
            await runAssistantAnswer(prompt);
        }
        lastMessage && fetchAnswer();
    }, [lastMessage]);

    useEffect(() => {
        if (assistantMessage.length > 0 && !isAiTyping) {
            let createdDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx");
            let chatId = currentChat?.id!;
            let sendBy = {
                avatar: uimg,
                email: 'innsight@innsight.com',
                fullName: 'InnSight AI',
                id: uuid
            }
            sendAiMsgToDb({
                sendBy,
                chatId,
                createdDate,
                message: assistantMessage
            });
            isAiVoiceEnabled && playPollySpeech(assistantMessage);
        }

        if (isAiTyping) {
            setPreviousAsMsg(assistantMessage);
            let chatId = currentChat?.id!;
            let sendBy = {
                avatar: uimg,
                email: 'innsight@innsight.com',
                fullName: 'InnSight AI',
                id: uuid
            }
            dispatch(updateMessage({
                sendBy,
                chatId,
                createdDate,
                message: assistantMessage,
                previousMessage: previousAsMsg
            }))
        }
    }, [assistantMessage, isAiTyping, isAiVoiceEnabled]);


    return { detectIfUserSendMessage }
}