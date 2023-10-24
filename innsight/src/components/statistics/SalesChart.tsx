import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useReduxSelector } from "~/hooks/reduxHooks"
import { getToday } from "~/utils/helpers"
import { LoadingPage } from "../LoadingPage"
import { Booking } from "~/types/bookings.d"
import { memo } from "react"

export const SalesChart: React.FC<{
    salesAndCheckedIns:Booking[]
    numDays: number,
    isLoading:boolean
}> = memo(({ salesAndCheckedIns, numDays,isLoading}) => {
    const { theme } = useReduxSelector(st => st.appReducer);

    const allDates = eachDayOfInterval({
        start: subDays(new Date(), numDays - 1),
        end: new Date(getToday({end:false}))
    });

    const data = allDates?.map(date => {
        return {
            label: format(date, "MMM dd"),
            totalSales: salesAndCheckedIns?.filter(booking => isSameDay(date, new Date(booking.checkInDate!)))?.reduce(
                (acc, curr) => acc + curr.totalPrice,
                0
            ) ,
            extrasSales: salesAndCheckedIns?.filter(booking => isSameDay(date, new Date(booking.checkInDate!)))?.reduce(
                (acc, curr) => acc + curr.extrasPrice!,
                0
            ) 
        }
    });

    return (
        <div className="w-11/12 mx-auto dark:bg-secondary dark:shadow-none shadow-md p-5 rounded-xl text-start space-y-5 relative overflow-hidden">
            {isLoading && <LoadingPage/>}
            <h3>Sales from {format(allDates[0], 'MMM dd yyyy')} to {format(allDates[allDates.length - 1], 'MMM dd yyyy')}</h3>
            <ResponsiveContainer height={400} width={'100%'}>
                <AreaChart data={data}>
                    <XAxis dataKey={'label'} tick={{ fill: theme ==='dark' ? "white":'black' }} tickLine={{ stroke: theme ==='dark' ? "white":'black' }} />
                    <YAxis unit={'$'} tick={{ fill: theme ==='dark' ? "white":'black' }} tickLine={{ stroke: theme ==='dark' ? "white":'black' }} />
                    <CartesianGrid stroke={theme === "dark" ? `#202329` : '#bebebe'} strokeDasharray="6" />
                    <Tooltip contentStyle={{ backgroundColor: theme==='dark'? "black":'white', borderRadius: "10px" }} />
                    <Area dataKey="totalSales" name="Total Sales" stroke={"#00ff62"} unit={"$"} fill={'#36ff83'} type='monotone' />
                    <Area dataKey="extrasSales" name="Extras Sales" stroke={"#00bbff"} unit={"$"} fill={'#39c7fa'} type='monotone' />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}
)