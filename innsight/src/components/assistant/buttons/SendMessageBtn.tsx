import { format } from 'date-fns';
import { memo } from 'react';
import { AiOutlineSend } from 'react-icons/ai'
import { useReduxDispatch, useReduxSelector } from '~/hooks/reduxHooks';
import { InnSightUser, Message } from '~/types/messaging.d';
import { useUserMessages } from '~/hooks/useUserMessages';
import { updateMessages } from '~/redux/slices/messagingSlice';

interface SendMessageBtnInterface { userData: InnSightUser,messages:Message[]}

export const SendMessageBtn: React.FC<SendMessageBtnInterface> = memo(({userData,messages }) => {
    const { currentChat,isAiTyping,messageValue } = useReduxSelector(st => st.messagingReducer);
    const { saveMessageToDb, isMessageSending } = useUserMessages();
    const dispatch = useReduxDispatch();

    const handleSendMessage = async () => {
        let newMessage: Message = {
            sendBy: userData,
            message: messageValue,
            createdDate: format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx"),
            chatId: currentChat?.id!
        }
        dispatch(updateMessages([...messages,newMessage]));
        console.warn("this message will be sent to the database",newMessage.message);
        saveMessageToDb(newMessage);
    }

    return (
        <button 
        disabled={messageValue.trim() === "" || isMessageSending || isAiTyping} 
        onClick={handleSendMessage} 
        className={isAiTyping ? "btn animate-pulse animation-slow" : "btn"}><AiOutlineSend size={20} /></button>
    )
})
