import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom"
import { getRecentBookingsByDate } from "~/services/apiBookings";

export const useRecentBookings = () =>{
    const [ searchParams ] = useSearchParams();
    
    const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

    const queryDate = subDays(new Date(),numDays).toISOString();
    
    const {isPending:isBookingsLoading,data:recentBookings} = useQuery({
        queryKey:["bookings",`last-${numDays}`],
        queryFn:()=>getRecentBookingsByDate(queryDate)
    })
    return {isBookingsLoading,recentBookings}
}