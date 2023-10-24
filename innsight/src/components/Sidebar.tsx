import { Link, useLocation } from "react-router-dom"
import { navigation } from "~/utils/app.config"
import { Logo } from "./Logo"
import { useReduxDispatch } from "~/hooks/reduxHooks"
import { sidebarToggle } from "~/redux/slices/appSlice"

export const Sidebar: React.FC<{ sidebarOpen: boolean }> = ({ sidebarOpen }) => {
  const location = useLocation();
  const dispatch = useReduxDispatch();

  return (
    <aside className={sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}>
      <header className='p-1 flex items-center space-x-10'>
        <button onClick={() => dispatch(sidebarToggle(!sidebarOpen))} >
          <Logo size={8} />

        </button>

      </header>
      <div className=" p-2 ">
        <ul className="space-y-8">
          {navigation.map((item, index) => (
            <li className={sidebarOpen ? " mx-auto w-full" : "w-full"} key={index}>
              <Link className='flex items-center sm:space-x-5 lg:space-x-12 w-full' to={item.path}>
                <span 
                className={location.pathname === item.path
                 ? 'text-primary-500' 
                 : 'dark:text-indigo-200 text-zinc-500  '}><item.icon size={20} /></span>
                <span 
                className={location.pathname === item.path
                 ? 'text-primary-500 font-medium lg:mx-auto sm:hidden lg:block' 
                 : "dark:text-indigo-200  text-zinc-500 font-medium mx-auto sm:hidden lg:block"}>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}