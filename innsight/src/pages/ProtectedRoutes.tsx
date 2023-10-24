import { Outlet, useNavigate } from "react-router-dom"
import { useUser } from "~/hooks/useUser"
import { LoadingPage } from "~/components/LoadingPage";
import { useEffect } from "react";

export const ProtectedRoutes: React.FC = () => {
    const navigate = useNavigate();

    // load the authenticated user
    const { isPending, isSuccess, isAuthenticated } = useUser();

    // if there is no authenticated user, redirect to the login
    useEffect(() => {
        if (!isAuthenticated && isSuccess && !isPending) {
            navigate('/auth')}
    }, [isAuthenticated, isPending, navigate])

    // while loading, show a spinner
    if (isPending) return <LoadingPage />

    // if there is user render the app
    if (isAuthenticated) return <Outlet />
}
