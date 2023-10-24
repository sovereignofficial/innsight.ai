import Table from "~/components/tables/Table"
import { RowTools } from "~/components/tables/RowTools"
import { AiOutlineEye } from "react-icons/ai"
import { BiCheckCircle, BiTrash } from "react-icons/bi"
import { ToolOption } from "~/components/tables/ToolOption"
import { useNavigate } from "react-router-dom"
import { TableFooter } from "~/components/tables/TableFooter"
import Filters from "~/components/filters/Filters"
import { HiArrowUpOnSquare } from "react-icons/hi2"
import { useBooking } from "~/hooks/useBooking"
import { useBookings } from "~/hooks/useBookings"
import { Button } from "~/components/Button"
import { useGPT } from "~/hooks/useGPT"
import { useReduxSelector } from "~/hooks/reduxHooks"
import { Booking, BookingStates } from "~/types/bookings.d"
import { TableRow } from "~/types/table.d"
import { useCallback } from "react"

export const Bookings: React.FC = () => {
  const navigate = useNavigate();
  const redirectToBookingDetails = (bookingId: number) => {
    navigate(`/bookings/${bookingId}`)
  }
  const redirectToCheckIn = (bookingId: number) => {
    navigate(`/checkin/${bookingId}`)
  }
  const { isBookingLoading, tableData, currPage, pages } = useBookings()
  const { checkOutFn, deleteFn
  } = useBooking()
  const { createTempBookingsFn, isTempBookingsLoading } = useGPT();
  const { hotelSettings } = useReduxSelector(st => st.appReducer);

  const pageDataToJSXRows = useCallback((pageData: Booking[]) => {

    const setStatusStyle = (item: Booking): string => {
      const status = item.status === BookingStates.UNCONFIRMED ? "bg-blue-400 text-blue-900 font-bold " : item.status === BookingStates.CHECKEDIN
        ? 'bg-green-400 text-green-900 font-bold' : 'bg-blue-200 text-blue-900 font-bold'
      return status
    }
    const rows: TableRow[] = [];
    pageData?.map(item => {
      rows.push({
        cells: [
          (<div>
            <p >{item?.cabins?.name}</p>
          </div>),
          (<div>
            <div >
              <p>{item?.guests?.fullName}</p>
              <p className="text-zinc-500 sm:hidden lg">{item?.guests?.email}</p>
            </div>
          </div>),
          (<div>
            <p>{item.bookingDates?.bookingInfo.arrive} → {item.numNigths} nights stay </p>
            <p className="text-zinc-500">{item.bookingDates?.formattedStartDate} - {item.bookingDates?.formattedEndDate}</p>
          </div>),
          (<div><span className={`px-3 py-1 uppercase sm:text-xs lg:text-sm rounded-full ${setStatusStyle(item)}`}>{item.status}</span></div>),
          (<p>${item.totalPrice}</p>),
          (<RowTools>
            <ToolOption onClick={() => redirectToBookingDetails(item.id!)}><AiOutlineEye /> <p>See Details</p></ToolOption>
            {item.status === BookingStates.CHECKEDIN
              ? <ToolOption onClick={() => checkOutFn(item)}><HiArrowUpOnSquare /> <p>Check out</p></ToolOption>
              : item.status === BookingStates.UNCONFIRMED
                ? <ToolOption onClick={() => redirectToCheckIn(item.id!)}><BiCheckCircle /> <p>Check In</p></ToolOption>
                : <ToolOption onClick={() => deleteFn(item.id!)}><BiTrash /> <p>Delete booking</p></ToolOption>
            }
          </RowTools>)
        ]
      })

    });

    return (
      <tbody>
        {rows.map(({ cells }, indexA) => (
          <tr className='dark:hover:bg-zinc-900/50 hover:bg-zinc-100 text-cennter' key={indexA}>
            {cells.map((cell, indexB) => (
              <td className='border-t dark:border-zinc-800 border-zinc-300 p-1' key={indexB + 100}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    )
  }, [pages, currPage])

  return (
    <div className="page">
      <div className="page-header" >
        <h1>Bookings</h1>
        <div className="flex items-center gap-2 flex-wrap px-2 sm:mx-auto lg:mx-0">
          <Filters>
            <Filters.FilterItem type="btn" innerText="All" />
            <Filters.FilterItem type="btn" innerText="Unconfirmed" />
            <Filters.FilterItem type="btn" innerText="Checked in" />
            <Filters.FilterItem type="btn" innerText="Checked out" />
            <Filters.FilterItem type="selectBox" innerText="Sort by" options={[
              {
                value: 'dateNew',
                text: "Sort by date ↑"
              },
              {
                value: "dateOld",
                text: "Sort by date ↓"
              }
            ]} />
          </Filters>
          <Button type="default" isLoading={isTempBookingsLoading} text="Create template bookings" onClick={() => createTempBookingsFn(hotelSettings)} />

        </div>
      </div>

      <Table isLoading={isBookingLoading}>
        <Table.Head headers={tableData.headers} />
        <Table.Body renderRows={() => pageDataToJSXRows(pages[currPage])} />
      </Table>
      <TableFooter rows={tableData.rows} currPage={currPage} pages={pages} />

    </div>
  )
}
