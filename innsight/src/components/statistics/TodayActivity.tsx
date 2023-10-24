import { useTodayActivity } from "~/hooks/useTodayActivity"
import { LoadingPage } from "../LoadingPage";
import { TodayItem } from "./TodayItem"
import { TodayList } from "./TodayList"

export const TodayActivity = () => {
    const {activities,isPending} = useTodayActivity();
    
  return (
    <div className='col-span-1 h-[400px] w-full p-5 rounded-xl dark:bg-secondary dark:shadow-none shadow-lg relative overflow-y-scroll space-y-3'>
         {isPending && <LoadingPage/>}
         <h3 className="text-start">Today</h3>
         <div className='w-full'>
            <TodayList>
                {activities?.map((activity,index)=>(
                    <TodayItem activity={activity} key={index}/>
                ))}
            </TodayList>
         </div>
    </div>
  )
}
