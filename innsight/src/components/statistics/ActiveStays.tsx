import { differenceInDays } from "date-fns";
import { useActiveStays } from "~/hooks/useActiveStays"
import { LoadingPage } from "../LoadingPage";
import { StayListItem } from "./StayListItem"
import { StaysList } from "./StaysList"
import { useNavigate } from "react-router-dom";
import { memo } from "react";

export const ActiveStays: React.FC = memo(() => {
    const { activeStays, isActiveStaysLoading } = useActiveStays();
    const navigate = useNavigate();

    return (
        <div className='col-span-1 sm:w-full lg:w-11/12 mx-auto h-[400px] p-5 rounded-xl dark:bg-secondary dark:shadow-none shadow-lg relative overflow-y-scroll space-y-3'>
            {isActiveStaysLoading && <LoadingPage />}
            <div className="flex justify-between items-center">
                <h3 className="text-start">Active Stays</h3>
                <h4>{activeStays?.length} stays found </h4>
            </div>
            <div className="w-full">
                <StaysList>
                    {activeStays?.map((stay, index) => (
                        <StayListItem onClick={() => navigate(`/bookings/${stay.id}`)} key={index}>
                            <div className="space-x-2">
                                <p>{stay.guests?.fullName}</p>
                            </div>
                            <div className="space-x-2">
                                <p>Cabin {stay.cabins?.name} with {stay.numGuests} guests</p>
                            </div>
                            <div className="space-x-2">
                                <p>{differenceInDays(new Date(stay.endDate), new Date())} days remain</p>
                            </div>
                        </StayListItem>
                    ))}
                </StaysList>
            </div>
        </div>
    )
}
)