import { RiChatVoiceFill, RiChatVoiceLine } from 'react-icons/ri';
import { useReduxDispatch, useReduxSelector } from '~/hooks/reduxHooks';
import { toggleAiVoiceChat } from '~/redux/slices/messagingSlice';


export const ToggleAIVoice: React.FC = () => {
    const { isAiVoiceEnabled } = useReduxSelector(st => st.messagingReducer)
    const dispatch = useReduxDispatch();
    const toggleAiVoice = () => {
        dispatch(toggleAiVoiceChat());
    }
    return (
        <button className='bg-gray-400/20 hover:bg-gray-400 p-2 rounded-full' onClick={toggleAiVoice}>
            {isAiVoiceEnabled
                ? <RiChatVoiceFill size={20} />
                : <RiChatVoiceLine size={20} />
            }
        </button>
    )
}
