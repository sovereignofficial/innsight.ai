import { useMutation, useQueryClient } from "@tanstack/react-query"
import { logout } from "~/services/apiAuth"
import { useNavigate } from "react-router-dom"

export const useLogout = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {mutate:logoutFn, isPending:isLoading} = useMutation({
        mutationKey:['logout'],
        mutationFn:logout,
        onSuccess:()=>{
            queryClient.removeQueries();
            navigate('/auth',{replace:true});
        }
    });


    return {logoutFn,isLoading}
}