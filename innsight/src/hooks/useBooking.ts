import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { deleteBooking, getBookingById, updateBooking } from "~/services/apiBookings";
import { useReduxSelector } from "./reduxHooks";
import { useDispatch } from "react-redux";
import { changeFilterMethod } from "~/redux/slices/filterSlice";
import { initiateToast } from "~/utils/helpers";
import { Booking, BookingStates } from "~/types/bookings.d";
import { useErrorHandler } from "./useErrorHandler";
import { toastStates } from "~/types/toast.d";
import { updateCabin } from "~/services/apiCabins";

export const useBooking = (bookingId?: number) => {
    const [confirmPayment, setConfirmPayment] = useState<boolean>(false);
    const [includeBreakfast, setIncludeBreakfast] = useState<boolean>(false);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const { handleError } = useErrorHandler();
    const { hotelSettings } = useReduxSelector(st => st.appReducer);
    const dispatch = useDispatch();

    const queryEnabled = typeof bookingId !== 'undefined'

    const { data: bookingData, isLoading: isBookingLoading, isError: isBookingError, refetch } = useQuery({
        queryKey: ['booking'],
        queryFn: () => getBookingById(bookingId!),
        enabled: queryEnabled
    });

    const queryClient = useQueryClient();

    const handleCheckIn = async (bookingId:number,cabinId:number) =>{
       
        await updateCabin({
            cabinId,
            newValues:{
                ...bookingData?.cabins,
                isFull:true
            }
        });
        await updateBooking(bookingId!, {
            isPaid: confirmPayment,
            status: BookingStates.CHECKEDIN,
            hasBreakfast: includeBreakfast,
            totalPrice: totalPrice,
            checkInDate: new Date().toISOString()
        })
    }
    const { mutate: checkInFn } = useMutation({
        mutationKey: ['booking'],
        mutationFn: (bookingId:number) => handleCheckIn(bookingId!,bookingData?.cabinId!),
        onSuccess: () => {
            queryClient.invalidateQueries();
            initiateToast({ state: toastStates.SUCCESS, message: "Booking has been checked in!" })
        },
        onError: (err) => { handleError(err) }
    });

    const handleCheckOut = async (booking:Booking) =>{
       await  updateCabin({
            cabinId:booking.cabinId,
            newValues:{
                ...booking?.cabins!,
                isFull:false
            }
        });
        await updateBooking(booking.id!, {
            status: BookingStates.CHECKEDOUT,
            checkOutDate: new Date().toISOString()
        })
    }
    const { mutate: checkOutFn}
        = useMutation({
            mutationKey: ['bookingCheckOut'],
            mutationFn:(booking:Booking)=>handleCheckOut(booking),
            onSuccess: () => {
                queryClient.invalidateQueries();
                initiateToast({ state: toastStates.SUCCESS, message: "Booking has been checked out!" })
                dispatch(changeFilterMethod('All'))
            },
            onError: (err) => { handleError(err) }

        })
    const { mutate: deleteFn }
        = useMutation({
            mutationKey: ['bookingDelete'],
            mutationFn: (bookingId: number) => deleteBooking(bookingId),
            onSuccess: () => {
                queryClient.invalidateQueries();
                initiateToast({ state: toastStates.SUCCESS, message: "Booking has been deleted!" })
                dispatch(changeFilterMethod('All'))
            },
            onError: (err) => { handleError(err) }
        })

    useEffect(() => {
        if (!isBookingError) {
            setConfirmPayment(bookingData?.isPaid!);
            setIncludeBreakfast(bookingData?.hasBreakfast!);
            setTotalPrice(bookingData?.totalPrice!);
        }
    }, [isBookingError, bookingData]);

    useEffect(() => {
        if (bookingId) {
            refetch();
        }
    }, [bookingId, refetch]);

    useEffect(() => {
        setTotalPrice(includeBreakfast ? (bookingData?.cabinPrice! + (hotelSettings?.breakfastPrice * bookingData?.numNigths! * bookingData?.numGuests!)) : (bookingData?.cabinPrice!));
    }, [includeBreakfast])

    return {
        bookingData, isBookingLoading,checkInFn,
        confirmPayment, includeBreakfast, totalPrice, setIncludeBreakfast, setConfirmPayment,
        checkOutFn, deleteFn
    }
}