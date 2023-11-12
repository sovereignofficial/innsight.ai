import { createSlice } from "@reduxjs/toolkit";
import { Message, MessagingChatStates } from "~/types/messaging.d";
import { toastStates } from '~/types/toast.d';
import { initiateToast } from '~/utils/helpers';

const messagingSlice = createSlice({
    name: 'MessagingSlice',
    initialState: {
        isAiVoiceEnabled: false,
        isMicOpen: false,
        isConversationStarted: false,
        isAiTyping: false,
        messageValue: "",
        messages: [],
        currentChat: null,
    } as MessagingChatStates,
    reducers: {
        microphoneOn: (state) => {
            state.isMicOpen = true;
        },
        microphoneOff: (state) => {
            state.isMicOpen = false;
        },
        toggleAiVoiceChat: (state) => {
            state.isAiVoiceEnabled = !state.isAiVoiceEnabled;
            initiateToast({
                state: toastStates.SUCCESS,
                message: `AI voice chat has been ${state.isAiVoiceEnabled ? 'enabled.' : 'disabled.'}`
            });
        },
        updateMessageValue: (state, action) => {
            state.messageValue = action.payload;
        },
        setCurrentChat: (state, action) => {
            state.currentChat = action.payload;
        },
        setIfAiTyping: (state, action) => {
            state.isAiTyping = action.payload;
        },
        updateMessages: (state, action) => {
            state.messages = action.payload;
        },
        updateMessage: (state, action) => {
            const index: number = state.messages.findIndex(item =>
                item.sendBy.id! === action.payload.sendBy.id
                && item.createdDate === action.payload.createdDate
                && item.message === action.payload.previousMessage);

            const updatedMessage: Message = action.payload;

            index !== -1
                ? state.messages[index].message = action.payload.message
                : updatedMessage.message.length > 0 && state.messages.push(updatedMessage);
        },

    },
})

export const { toggleAiVoiceChat, microphoneOff, microphoneOn, setIfAiTyping, updateMessageValue,
    setCurrentChat, updateMessages, updateMessage } = messagingSlice.actions;
export const messagingReducer = messagingSlice.reducer;