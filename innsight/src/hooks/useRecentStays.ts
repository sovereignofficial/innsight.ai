import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "~/services/apiBookings";
import { BookingStates } from "~/types/bookings.d";


export const useRecentStays = () => {
    const [ searchParams ] = useSearchParams();
    
    const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

    const queryDate = subDays(new Date(),numDays).toISOString();

    const {isPending:isStaysLoading,data:lastStays}= useQuery({
        queryKey:["stays",`last-${numDays}`],
        queryFn:()=>getStaysAfterDate(queryDate)
    });

    const confirmedStays = lastStays?.filter(
        (stay)=> stay.status === BookingStates.CHECKEDIN || stay.status === BookingStates.CHECKEDOUT
    );

    return {isStaysLoading,lastStays,confirmedStays,numDays}

}