import { useQuery } from "@tanstack/react-query";
import {  getTodaysActivity } from "~/services/apiBookings";
import { Booking, BookingStates } from "~/types/bookings.d";

export const useTodayActivity = () => {
    const { isPending, data } = useQuery({
        queryFn: getTodaysActivity,
        queryKey: ["today-activity"],
      });
    
    let activities:Booking[] = [];
    console.log(data);
    const unconfirmedActivities = data?.checkInActivities.filter(booking => booking.status !== BookingStates.CHECKEDIN);
    const unCheckedActivities = data?.checkOutActivities.filter(booking => booking.status !== BookingStates.CHECKEDOUT);
    
    if(unCheckedActivities && unconfirmedActivities){
      activities = [...unconfirmedActivities,...unCheckedActivities]
    }
      return { activities, isPending };
}