import { lazy, Suspense } from 'react';
import { Navigate, useLocation, useRoutes } from "react-router-dom"
import { AppLayout } from "~/components/layouts/AppLayout"

const ProtectedRoutes = lazy(()=> import("~/pages/ProtectedRoutes"))
const Dashboard = lazy(() => import("~/pages/Dashboard"));
const Auth = lazy(() => import("~/pages/Auth"));
const Bookings = lazy(() => import("~/pages/Bookings"));
const Cabins = lazy(() => import("~/pages/Cabins"));
const Settings = lazy(() => import("~/pages/Settings"));
const Users = lazy(() => import("~/pages/Users"));
const BookingDetails = lazy(() => import("~/pages/BookingDetails"));
const Account = lazy(() => import("~/pages/Account"));
const Guests = lazy(() => import("~/pages/Guests"));
const Assistant = lazy(() => import("~/pages/Assistant"));

import { useQuery } from "@tanstack/react-query"
import { getSettings } from "~/services/apiSettings"
import { useReduxDispatch, useReduxSelector } from "~/hooks/reduxHooks"
import { updateHotelSettings } from "~/redux/slices/appSlice"
import { useEffect } from "react"
import { changeFilterMethod, clearFilterData } from "~/redux/slices/filterSlice"
import { resetTablePage } from "~/redux/slices/tableSlice"
import { useErrorHandler } from "./hooks/useErrorHandler"
import { setCurrentChat, updateMessages } from "./redux/slices/messagingSlice"
import { LoadingPage } from './components/LoadingPage';


function App() {
  const dispatch = useReduxDispatch();
  const { filterMethod } = useReduxSelector(st => st.filterReducer)
  const location = useLocation();
  const tablePath = location.pathname === '/cabins' || location.pathname === '/bookings' || location.pathname === '/guests';
  const assistantPath = location.pathname.includes('/assistant');
  const { handleError } = useErrorHandler();

  const { data: settings, isError, error } = useQuery({
    queryKey: ['settingsQ'],
    queryFn: getSettings,
  });
  useEffect(() => {
    !isError ? dispatch(updateHotelSettings(settings)) : handleError(error);
  }, [isError, settings, error])

  useEffect(() => {
    if (tablePath) {
      dispatch(changeFilterMethod('All'));
      dispatch(clearFilterData());
    }

    if (assistantPath && !window.location.href.includes('?c=')) {
      dispatch(updateMessages([]));
      dispatch(setCurrentChat(null));
    }
  }, [location])

  useEffect(() => {
    tablePath && dispatch(resetTablePage());
  }, [filterMethod])

  const routes = useRoutes([
    {
      element: <ProtectedRoutes />,
      children: [
        {
          element: <AppLayout />,
          children: [
            {
              path: '/',
              element: <Navigate to='dashboard' />
            },
            {
              path: 'dashboard',
              element: <Dashboard />
            },
            {
              path: '/assistant',
              element: <Assistant />
            },
            {
              path: 'bookings',
              element: <Bookings />,
            },
            {
              path: 'bookings/:bookingId',
              element: <BookingDetails checkIn={false} />
            },
            {
              path: 'checkin/:bookingId',
              element: <BookingDetails checkIn={true} />
            },
            {
              path: 'cabins',
              element: <Cabins />
            },
            {
              path: 'guests',
              element: <Guests />
            },
            {
              path: 'settings',
              element: <Settings />
            },
            {
              path: 'users',
              element: <Users />
            },
            {
              path: 'account',
              element: <Account />
            }
          ]
        },
      ],
    },
    {
      path: 'auth',
      element: <Auth />
    },
  ]);



  return <Suspense fallback={(<LoadingPage/>)}>
    {routes}
  </Suspense>
}

export default App