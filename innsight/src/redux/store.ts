import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from './slices/appSlice';
import { filterReducer } from './slices/filterSlice';
import { tableReducer } from './slices/tableSlice';
import { messagingReducer } from './slices/messagingSlice';

export const store = configureStore({
    reducer: {
        appReducer,
        filterReducer,
        tableReducer,
        messagingReducer
    }
})

