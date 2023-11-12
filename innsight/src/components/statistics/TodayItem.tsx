import { useNavigate } from "react-router-dom";
import { Booking, BookingStates } from "~/types/bookings.d"
import { useBooking } from "~/hooks/useBooking";



export const TodayItem: React.FC<{ activity: Booking}> = ({ activity  }) => {

    const { status, guests, numNigths } = activity;

    const activityStatus = status === BookingStates.UNCONFIRMED ? "arriving" : status === BookingStates.CHECKEDIN ? "departing" : "error";

    const statusBgStyle = status === BookingStates.UNCONFIRMED  ? " bg-green-300 text-green-900 rounded-full px-3" :  " bg-blue-300 text-blue-900 rounded-full px-3";

    return (
        <li className="flex justify-between items-center w-full p-1 border-y border-zinc-700">
            <div className={statusBgStyle}><p className="uppercase font-bold">{activityStatus}</p></div>
            <div className='w-10 h-5 mt-1 rounded-sm relative overflow-hidden'>
                <img className='w-full h-full object-cover' src={guests?.countryFlag || ''} />
            </div>
            <p><strong>{guests?.fullName}</strong></p>
            <p><strong>{numNigths}</strong> nights</p>
            <ActivityTaskButton activityStatus={activityStatus} booking={activity}/>
        </li>
    )
}

const ActivityTaskButton:React.FC<{activityStatus:string,booking:Booking}> = ({activityStatus,booking})=>{
    const navigate = useNavigate();
    const {checkOutFn} = useBooking()
        
    if(activityStatus === "arriving"){

        return (
            <button onClick={()=>navigate(`/checkin/${booking.id}`)} className="btn bg-green-300 text-green-900 hover:bg-green-500">
                Check in
            </button>
        )
    }else{

        return (
            <button onClick={()=>checkOutFn(booking)} className="btn">
                Check out
            </button>
        )
    }
}