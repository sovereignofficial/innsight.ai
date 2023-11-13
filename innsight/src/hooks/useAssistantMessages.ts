import { useEffect, useState } from "react";
import { useReduxDispatch, useReduxSelector } from "./reduxHooks";
import { emitter, runGptStream } from "~/services/apiAI";
import { Message } from "~/types/messaging.d";
import { setIfAiTyping, updateMessage } from "~/redux/slices/messagingSlice";
import { useErrorHandler } from "./useErrorHandler";
import { useMutation } from "@tanstack/react-query";
import { insertMessage } from "~/services/apiAssistant";
import { format } from "date-fns";
import { useBookings } from "./useBookings";
import { playPollySpeech } from "~/services/amazon";



export const useAssistantMessages = () => {
    const dispatch = useReduxDispatch();
    const { isAiTyping, currentChat, isAiVoiceEnabled } = useReduxSelector(st => st.messagingReducer)
    const { handleError } = useErrorHandler();
    const [lastMessage, setLastMessage] = useState<Message | null>(null);
    const [prompt, setPrompt] = useState('');
    const [assistantMessage, setAssistantMessage] = useState('');
    const [previousAsMsg, setPreviousAsMsg] = useState(assistantMessage);
    const [createdDate, setCreatedDate] = useState(format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx"));
    const { bookings } = useBookings();
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
        const bookingsWithoutImageURLS = bookings?.map(item=>{
             const updatedCabins = {
                 ...item.cabins,
                 image:"",
             }
             const updatedGuests = {
                    ...item.guests,
                    countryFlag:"",
             }
             return {
                ...item,
                cabins:updatedCabins,
                guests:updatedGuests,
             }
        })
        const lastMessage = history[history.length - 1]
        if (lastMessage.sendBy.id !== uuid) {
            const innSightPrompt = `
                Prompt:${lastMessage.message}    
                hotelData:{
                    resortBookings:${JSON.stringify(bookingsWithoutImageURLS?.slice(-10))}
                }
                Rules => 
                * For booking recommendations, you can provide the booking history and guest information as part of the prompt.
                * For guest inquiries, you can provide the guest's question as the newQuestion parameter in the prompt.
                * For mentioning about cabins, please ignore the image address of cabin data. You don't need to share that info with user.
                * For analyzing bookings in a given time period, you can provide the bookings variable as part of the prompt.
                * For sales analysis, you can provide sales data as part of the prompt.
                * For analyzing which cabins are mostly used, you can provide cabin usage data as part of the prompt.
                * The user that is asking questions to you is resort staff or manager. You can share data with them without any doubt.
                * If user asking about 'income','revenue','sales' you should check total of the totalPrice values of the bookings.
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