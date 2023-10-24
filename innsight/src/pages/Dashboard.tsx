import { useEffect } from "react";
import Filters from "~/components/filters/Filters"
import { useRecentBookings } from "~/hooks/useRecentBookings"
import { useRecentStays } from "~/hooks/useRecentStays";
import { useCabins } from "~/hooks/useCabins";
import { Stats } from "~/components/statistics/Stats";
import { SalesChart } from "~/components/statistics/SalesChart";
import { DurationChart } from "~/components/statistics/DurationChart";
import { TodayActivity } from "~/components/statistics/TodayActivity";
import { useReduxDispatch } from "~/hooks/reduxHooks";
import { changeFilterMethod } from "~/redux/slices/filterSlice";
import { ActiveStays } from "~/components/statistics/ActiveStays";
import { useSearchParams } from 'react-router-dom'


export const Dashboard = () => {
  const dispatch = useReduxDispatch();
  const { recentBookings, isBookingsLoading } = useRecentBookings();
  const { isStaysLoading, numDays, confirmedStays } = useRecentStays();
  const { cabins, isCabinsLoading } = useCabins()
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const numDays = !searchParams.get('last') ? 7 : Number(searchParams.get("last"))
    dispatch(changeFilterMethod(`Last ${numDays} days`))
  }, [])

  return (
    <div className="page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <div className="flex items-center gap-2 flex-wrap px-2 sm:mx-auto lg:mx-0">
          <Filters>
            <Filters.FilterItem value={7} type="btn" innerText="Last 7 days" />
            <Filters.FilterItem value={30} type="btn" innerText="Last 30 days" />
            <Filters.FilterItem value={90} type="btn" innerText="Last 90 days" />
          </Filters>
        </div>
      </div>

      <div className="relative min-h-[500px] rounded-xl p-5 space-y-10">
        <Stats
          isLoading={isBookingsLoading || isCabinsLoading || isStaysLoading}
          createdBookings={recentBookings?.createdBookings!}
          salesAndCheckedIns={recentBookings?.salesAndCheckIns!}
          cabins={cabins!}
          startedStays={confirmedStays!}
          numDays={numDays}
        />
        <SalesChart salesAndCheckedIns={recentBookings?.salesAndCheckIns!} numDays={numDays} isLoading={isBookingsLoading} />
        <div className="sm:w-full lg:w-11/12 grid lg:grid-cols-2 sm:grid-cols-1 mx-auto gap-2">
          <TodayActivity />
          <DurationChart confirmedStays={confirmedStays!} isLoading={isStaysLoading} />
        </div>
        <ActiveStays />
      </div>
    </div >
  )
}
