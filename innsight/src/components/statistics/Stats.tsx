import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import { Stat } from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { Booking } from "~/types/bookings.d";
import { Cabin } from "~/types/cabins";




export const Stats:React.FC<{
    createdBookings:Booking[],
    salesAndCheckedIns:Booking[]
    cabins:Cabin[],
    startedStays:Booking[]
    numDays:number,
    isLoading:boolean
}> = ({
    createdBookings,
    salesAndCheckedIns,
    cabins,
    startedStays,
    numDays,
    isLoading
}) => {

    //num bookings
    const numBookings =  createdBookings?.length;
    //sales amount
    const sales =  salesAndCheckedIns?.reduce(
        (acc,curr) => acc + curr.totalPrice,
        0
    ) 

    
    //confirmed stays amount
    const checkins = salesAndCheckedIns?.length;
    
    //occupancy rate
    const occupancyRate = Math.round((startedStays?.reduce((arr,curr)=>arr+curr.numNigths,0)/( cabins?.length * numDays)) * 100) 

    const stats = [
        {
            title:'bookings',
            icon:<HiOutlineBriefcase style={{color:"blue"}} size={27}/>,
            bgColor:"bg-blue-300",
            data:`${numBookings}`,
        },
        {
            title:'sales',
            icon:<HiOutlineBanknotes style={{color:"green"}} size={27}/>,
            bgColor:"bg-green-300",
            data:`$${sales}`,
        },
        {
            title:'checkins',
            icon:<HiOutlineCalendarDays style={{color:"red"}} size={27}/>,
            bgColor:"bg-red-300",
            data:`${checkins}`,
        },
        {
            title:'occupancy',
            icon:<HiOutlineChartBar style={{color:"orange"}} size={27}/>,
            bgColor:"bg-yellow-300",
            data:`${occupancyRate}%`,
        },
    ]
    return (
    <div className="w-11/12 mx-auto grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 gap-5">
        {stats.map(({title,icon,bgColor,data},index)=>(
                    <Stat key={index}
                    title={title}
                    icon={icon}
                    bgColor={bgColor}
                    data={data}
                    isLoading={isLoading}
                />
        ))}
    </div>
  )
}
