import {configureStore} from '@reduxjs/toolkit';
import { appReducer } from './slices/appSlice';
import { filterReducer } from './slices/filterSlice';
import { tableReducer } from './slices/tableSlice';

export const store = configureStore({
    reducer:{
        appReducer,
        filterReducer,
        tableReducer
    }
})

