import { createSlice } from "@reduxjs/toolkit";

const tableSlice = createSlice({
    name: "tableSlice",
    initialState: {
        data: {
            headers: [] as string[],
            rows:[] ,
        },
        pages: [] as any[][] ,
        currPage: 0,
    },
    reducers: {
        setPages: (state,action) => {
            console.log('2')
            const chunks=[];
            for (let i = 0; i < action.payload?.length; i += 4) {
                chunks.push(action.payload.slice(i, i + 4));
            }
            console.log(chunks)
            state.pages = chunks
        },
        setHeaders: (state, action) => {
            state.data.headers = action.payload;
        },
        setRows: (state, action) => {
            console.log('1')
            state.data.rows = action.payload;
        },
        nextPage: (state) => {
            if(state.currPage < state.pages.length - 1){
                state.currPage++;
            }
        },
        previousPage: (state) => {
            if(state.currPage > 0){
                state.currPage--;
            }
        },
        clearTable:(state)=>{
            state.data.rows= [];
            state.pages = [];
            state.currPage = 0;
        },
        resetTablePage:(state)=>{
            state.currPage = 0
        }
    }
});

export const { setHeaders, setRows, clearTable, setPages, nextPage, previousPage,resetTablePage } = tableSlice.actions;
export const tableReducer = tableSlice.reducer;