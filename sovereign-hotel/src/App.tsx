import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { AppLayout } from "./components/layouts/AppLayout"
import { Dashboard } from "./pages/Dashboard"
import { Auth } from "./pages/Auth"
import { Bookings } from "./pages/Bookings"
import { Cabins } from "./pages/Cabins"
import { Guests } from "./pages/Guests"
import { Settings } from "./pages/Settings"
import { Users } from "./pages/Users"



const routes = createBrowserRouter([
  {
    element:<AppLayout/>,
    children:[
      {
        path:'/',
        element:<Dashboard/>
      },
      {
        path:'auth',
        element:<Auth/>
      },
      {
        path:'bookings',
        element:<Bookings/>
      },
      {
        path:'cabins',
        element:<Cabins/>
      },
      {
        path:'guests',
        element:<Guests/>
      },
      {
        path:'settings',
        element:<Settings/>
      },
      {
        path:'users',
        element:<Users/>
      }
    ]
  }
])
function App() {

  return (
    <RouterProvider router={routes}/>
  )
}

export default App