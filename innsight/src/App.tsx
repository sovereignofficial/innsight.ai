import { useLocation, useRoutes } from "react-router-dom"
import { AppLayout } from "~/components/layouts/AppLayout"
import { Dashboard } from "~/pages/Dashboard"
import { Auth } from "~/pages/Auth"
import { Bookings } from "~/pages/Bookings"
import { Cabins } from "~/pages/Cabins"
import { Settings } from "~/pages/Settings"
import { Users } from "~/pages/Users"
import { BookingDetails } from "~/pages/BookingDetails"
import { useQuery } from "@tanstack/react-query"
import { getSettings } from "~/services/apiSettings"
import { useReduxDispatch, useReduxSelector } from "~/hooks/reduxHooks"
import { updateHotelSettings } from "~/redux/slices/appSlice"
import { useEffect } from "react"
import { changeFilterMethod, clearFilterData } from "~/redux/slices/filterSlice"
import { ProtectedRoutes } from "~/pages/ProtectedRoutes"
import { Account } from "~/pages/Account"
import { Guests } from "~/pages/Guests"
import { resetTablePage } from "~/redux/slices/tableSlice"
import { useErrorHandler } from "./hooks/useErrorHandler"


function App() {
  const dispatch = useReduxDispatch();
  const { filterMethod } = useReduxSelector(st=>st.filterReducer)
  const location = useLocation();
  const tablePath = location.pathname === '/cabins' || location.pathname === '/bookings' || location.pathname === '/guests';
  const {handleError} = useErrorHandler();

  const routes = useRoutes([
    {
      element: <ProtectedRoutes />,
      children: [
        {
          element: <AppLayout />,
          children: [
            {
              path: '/',
              element: <Dashboard />
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

 const {data:settings, isError,error} = useQuery({
    queryKey: ['settingsQ'],
    queryFn: getSettings,
  });
  useEffect(()=>{
    !isError ? dispatch(updateHotelSettings(settings)) : handleError(error);
  },[isError,settings,error])

  useEffect(() => {
    if (tablePath) {
      //set default filter
      dispatch(changeFilterMethod('All'));
      dispatch(clearFilterData());
    }

  }, [location])

  useEffect(()=>{
    tablePath && dispatch(resetTablePage());
  },[filterMethod])

  return routes
}

export default App