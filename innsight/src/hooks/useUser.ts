import { useMutation, useQuery } from "@tanstack/react-query"
import { getCurrentUser, updateUserData } from "~/services/apiAuth"
import { useLogout } from "./useLogout";
import { initiateToast } from "~/utils/helpers";
import { useErrorHandler } from "./useErrorHandler";
import { toastStates } from "~/types/toast.d";

export const useUser = () => {
    const { logoutFn } = useLogout();
    const { isPending, data: user, isSuccess } = useQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser
    })
    const {handleError} = useErrorHandler();

    const { mutate: updateUserFn, isPending: isUpdateLoading}
        = useMutation({
            mutationFn: updateUserData,
            mutationKey: ['updateUser'],
            onSuccess: () => {
                initiateToast({state:toastStates.SUCCESS,message:'Account has been updated successfully.'})
                // logoutFn();
            },
            onError:(err)=>{
                handleError(err);
            }
        });
    

    return {
        isPending, isSuccess, user, isAuthenticated: user?.role === 'authenticated',
        updateUserFn, isUpdateLoading
    }
}