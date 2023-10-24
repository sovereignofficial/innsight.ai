import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteGuest, getGuests, updateGuest } from "~/services/apiGuests";
import { useReduxDispatch, useReduxSelector } from "./reduxHooks";
import { useEffect } from "react";
import { setHeaders, setPages, setRows } from "~/redux/slices/tableSlice";
import { initiateToast } from "~/utils/helpers";
import { useErrorHandler } from "./useErrorHandler";
import { toastStates } from "~/types/toast.d";

export const useGuest = () => {
    const dispatch = useReduxDispatch();
    const { pages, data: tableData, currPage } = useReduxSelector(st => st.tableReducer);
    const { filteredData } = useReduxSelector(st => st.filterReducer);
    const { handleError } = useErrorHandler(); 

    const queryClient = useQueryClient();

    const { data: guests, isLoading: isGuestsLoading, isError: isGuestsError, error: guestsError } = useQuery({
        queryKey: ['guests'],
        queryFn: getGuests,
    });

    useEffect(() => {
        !isGuestsError ? dispatch(setRows(guests)) : handleError(guestsError);
    }, [guests, isGuestsError, guestsError]);

    const { mutate: deleteGuestFn, isPending: isDelGuestLoading } = useMutation({
        mutationKey: ['delete-guest'],
        mutationFn: deleteGuest,
        onSuccess: () => {
            queryClient.invalidateQueries();
            initiateToast({ state:toastStates.SUCCESS, message: 'Guest deleted!' });
        },
        onError:(err)=>{handleError(err)}
    })

    const { mutate: updateGuestFn, isPending: isUpdGuestLoading} = useMutation({
        mutationKey: ['delete-guest'],
        mutationFn: updateGuest,
        onSuccess: () => {
            queryClient.invalidateQueries();
            initiateToast({ state:toastStates.SUCCESS, message: 'Guest updated!' })
        },
        onError:(err)=>{handleError(err)}
    })

    useEffect(() => {
        dispatch(setHeaders(headers));
    }, [])

    useEffect(() => {
        tableData.rows?.length > 0 && dispatch(setPages(tableData.rows));
    }, [tableData.rows])

    useEffect(() => {
        filteredData?.length > 0 ? dispatch(setPages(filteredData)) : dispatch(setPages(tableData.rows))
    }, [filteredData])

    return {
        guests, isGuestsError, guestsError, isGuestsLoading,
        tableData, currPage, pages,
        deleteGuestFn, isDelGuestLoading,
        updateGuestFn,isUpdGuestLoading
    }
}

const headers = [
    'Full name',
    'Email',
    'Nationality',
    'National id',
    'Country flag'
]