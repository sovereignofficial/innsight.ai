import { useQuery } from "@tanstack/react-query"
import { getActiveStays } from "~/services/apiBookings"
import { useEffect } from "react";
import { useErrorHandler } from "./useErrorHandler";

export const useActiveStays = () => {
    const {handleError} = useErrorHandler();
    const {data:activeStays,isLoading:isActiveStaysLoading,isError:isActiveStaysError,error:activeStaysError} = useQuery({
        queryFn:getActiveStays,
        queryKey:['active-stays']
    });

    useEffect(()=>{
       isActiveStaysError && handleError(activeStaysError)
    },[isActiveStaysError,activeStaysError])

    return {activeStays,isActiveStaysLoading}
}