import { createSlice } from "@reduxjs/toolkit";
import { SettingsType } from "~/types/settings.d";
import { setTheme } from "~/utils/helpers";


const appSlice  = createSlice({
    name:'appSlice',
    initialState:{
        sidebarOpen:false,
        hotelSettings:{
            breakfastPrice:0,
            maxBookingLength:0,
            minBookingLength:0,
            maxGuestsPerBooking:0,
        } as SettingsType,
        theme:'light' as 'light' | 'dark',
    },
    reducers:{
        sidebarToggle:(state,action)=>{
            state.sidebarOpen = action.payload;
        },
        updateHotelSettings:(state,action)=>{
            state.hotelSettings = action.payload;
        },
        changeTheme:(state,action)=>{
            state.theme = action.payload
            setTheme(state.theme);
        }
    }
})

export const { sidebarToggle,updateHotelSettings,changeTheme } = appSlice.actions;
export const appReducer = appSlice.reducer;