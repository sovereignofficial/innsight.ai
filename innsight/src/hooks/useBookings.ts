import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getBookings } from "~/services/apiBookings";
import { useReduxDispatch, useReduxSelector } from "./reduxHooks";
import { setHeaders, setPages, setRows } from "~/redux/slices/tableSlice";
import { bookingsHeaders } from "~/utils/app.config";
import { useErrorHandler } from "./useErrorHandler";


export const useBookings = () => {
  const dispatch = useReduxDispatch();
  const { filteredData } = useReduxSelector(st => st.filterReducer);
  const { pages, data: tableData, currPage } = useReduxSelector(st => st.tableReducer);
  const { handleError } = useErrorHandler();

  const { isLoading: isBookingLoading, isError: isBookingError, error: bookingError, data: bookings }
    = useQuery({
      queryKey: ['bookings'],
      queryFn: getBookings,
    })

  useEffect(() => {
    !isBookingError ? dispatch(setRows(bookings)) : handleError(bookingError);

  }, [isBookingError, bookings]);

  useEffect(() => {
    dispatch(setHeaders(bookingsHeaders));
  }, [])

  useEffect(() => {
    tableData.rows?.length > 0 && dispatch(setPages(tableData.rows));
  }, [tableData.rows])

  useEffect(() => {
    filteredData?.length > 0 ? dispatch(setPages(filteredData)) : dispatch(setPages(tableData.rows))

  }, [filteredData])

  return {
    bookings, isBookingLoading, filteredData, tableData, pages, currPage
  }
}
