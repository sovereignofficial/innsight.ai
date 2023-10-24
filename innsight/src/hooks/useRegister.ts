import { useMutation } from "@tanstack/react-query"
import { register } from "~/services/apiAuth"
import { initiateToast } from "~/utils/helpers";
import { useErrorHandler } from "./useErrorHandler";
import { toastStates } from "~/types/toast.d";

export const useRegister = () => {
    const {handleError} = useErrorHandler();
    const {mutate:registerFn,isPending} = useMutation({
        mutationKey:['register'],
        mutationFn:register,
        onSuccess:()=>{
            initiateToast({state:toastStates.SUCCESS,message:"User has been created successfully!"})
        },
        onError:(err)=>{
            handleError(err);
        }
    });

    return {registerFn,isPending}
}