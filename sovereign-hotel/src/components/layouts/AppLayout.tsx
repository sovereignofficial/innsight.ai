import { Outlet } from "react-router-dom"
import { Sidebar } from "../Sidebar"
import { Header } from "../Header"

export const AppLayout = () => {
  return (
    <div className="flex">
        <Sidebar/>
        <main >
          <Header/>
          <Outlet/>
        </main>
    </div>
  )
}
