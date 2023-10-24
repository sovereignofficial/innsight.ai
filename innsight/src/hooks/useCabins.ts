import { useEffect} from "react";
import { useReduxDispatch, useReduxSelector } from "./reduxHooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCabins, getCabins } from "~/services/apiCabins";
import { setHeaders, setPages, setRows } from "~/redux/slices/tableSlice";
import { cabinHeaders } from "~/utils/app.config";
import { initiateToast } from "~/utils/helpers";
import { useErrorHandler } from "./useErrorHandler";
import { toastStates } from "~/types/toast.d";

export const useCabins = () => {
  const dispatch = useReduxDispatch();
  const { pages, data: tableData, currPage } = useReduxSelector(st => st.tableReducer);
  const { filteredData } = useReduxSelector(st => st.filterReducer);
  const { handleError } = useErrorHandler();

  const queryClient = useQueryClient();

  const { data: cabins, isLoading: isCabinsLoading, isError: isCabinsError, error: cabinError }
    = useQuery({
      queryKey: ['cabins'],
      queryFn: getCabins,
    });

  useEffect(() => {
    !isCabinsError ? dispatch(setRows(cabins)) : handleError(cabinError);
  }, [isCabinsError, cabins, cabinError])

  const { mutate: deleteFn } = useMutation({
      mutationKey: ['deleteCabin'],
      mutationFn: deleteCabins,
      onSuccess: () => {
        queryClient.invalidateQueries();
        initiateToast({ state: toastStates.SUCCESS, message: "Cabin removed!" })
      },
      onError:(err)=>{handleError(err)}
    })

  useEffect(() => {
    dispatch(setHeaders(cabinHeaders));
  }, [])

  useEffect(() => {
    tableData.rows?.length > 0 && dispatch(setPages(tableData.rows));
  }, [tableData.rows])

  useEffect(() => {
    filteredData?.length > 0 ? dispatch(setPages(filteredData)) : dispatch(setPages(tableData.rows))
  }, [filteredData])

  return {
    cabins,tableData, pages, currPage, filteredData, isCabinsLoading, deleteFn
  }
}