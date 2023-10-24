import { createSlice } from "@reduxjs/toolkit";
import { BookingStates } from "~/types/bookings.d";
import { FilterKey } from "~/types/filters.d";
import {
    newDateComparator, oldDateComparator,
    recursiveBinarySearchByDiscount, recursiveBinarySearchByStatus
} from "~/utils/helpers";

const filterSlice = createSlice({
    name: "filterSlice",
    initialState: {
        filteredData: [] as any[],
        filterMethod: 'All',
    },
    reducers: {
        filterTable: (state, action) => {
            const tableData = [...action.payload];
            const filterKey = state.filterMethod;

            switch (filterKey) {
                case FilterKey.WithDiscount:
                    const dataWithDiscount = recursiveBinarySearchByDiscount(tableData, true, 0, tableData.length);
                    state.filteredData = dataWithDiscount;
                    break;

                case FilterKey.NoDiscount:
                    const dataNoDiscount = recursiveBinarySearchByDiscount(tableData, false, 0, tableData.length);
                    state.filteredData = dataNoDiscount;
                    break;

                case FilterKey.PriceHigh:
                    const highPrice = tableData.sort((item1, item2) => item2.regularPrice - item1.regularPrice);
                    state.filteredData = highPrice;
                    break

                case FilterKey.PriceLow:
                    const lowPrice = tableData.sort((item1, item2) => item1.regularPrice - item2.regularPrice);
                    state.filteredData = lowPrice;
                    break;

                case FilterKey.UNCONFIRMED:
                    const statusUnc = recursiveBinarySearchByStatus(tableData, BookingStates.UNCONFIRMED, 0, tableData.length);
                    state.filteredData = statusUnc;
                    break;

                case FilterKey.CHECKEDIN:
                    const statusCheckin = recursiveBinarySearchByStatus(tableData, BookingStates.CHECKEDIN, 0, tableData.length);
                    state.filteredData = statusCheckin;
                    break;

                case FilterKey.CHECKEDOUT:
                    const statusCheckout = recursiveBinarySearchByStatus(tableData, BookingStates.CHECKEDOUT, 0, tableData.length);
                    state.filteredData = statusCheckout;
                    break;

                case FilterKey.DateNew:
                    const newData = tableData.sort((item1,item2)=>newDateComparator(item1.startDate,item2.startDate));
                    state.filteredData = newData;
                    break;

                case FilterKey.DateOld:
                    const oldData = tableData.sort((item1,item2)=>oldDateComparator(item1.startDate,item2.startDate));
                    state.filteredData = oldData;
                    break;
                
                default:
                    state.filteredData = [];
                    break;
            }
        },
        searchTableData:(state,action:{payload:{data:any[],searchQuery:string}})=>{
            const {data,searchQuery} = action.payload;
            const searchResults = data.filter(item=> item.fullName.includes(searchQuery));
            state.filteredData = searchResults;
            console.warn(state.filteredData);

        },
        changeFilterMethod: (state, action) => {
            state.filterMethod = action.payload;
        },
        clearFilterData:(state)=>{
            state.filteredData = []
        }
    }
});

export const { filterTable, changeFilterMethod,searchTableData,clearFilterData } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;