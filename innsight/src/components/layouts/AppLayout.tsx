import { Outlet } from "react-router-dom"
import { Sidebar } from "../Sidebar"
import { Header } from "../Header"
import { useReduxSelector } from "~/hooks/reduxHooks"
import { ToastContainer } from "react-toastify"

export const AppLayout = () => {
  const { sidebarOpen } = useReduxSelector(st=>st.appReducer);

  return (
    <div className="flex">
        <Sidebar sidebarOpen = {sidebarOpen} />
        <main className={sidebarOpen ? 'layout-sidebar-open': 'layout-sidebar-closed'}>
          <Header/>
          <Outlet/>
          <ToastContainer/>
        </main>
    </div>
  )
}
