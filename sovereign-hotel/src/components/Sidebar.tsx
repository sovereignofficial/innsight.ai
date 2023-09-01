import { Link, useLocation } from "react-router-dom"
import { navigation } from "../utils/app.config"
import { Logo } from "./Logo"
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from "react"

export const Sidebar = () => {
  const location = useLocation();
  const [isOpen , setIsOpen] = useState(true);

  return (
    <aside className={isOpen ? "h-screen bg-black space-y-20 p-1 md:w-[200px] sm:w-full relative overflow-hidden   transition-all duration-300"
    :" h-screen p-1 bg-black space-y-20 md:w-[45px] sm:w-0 relative overflow-hidden transition-all duration-300" }>
      <header className={ isOpen ? "p-2 flex items-center gap-5 justify-center" : "p-2 flex items-center gap-5"}>
        <button onClick={()=>setIsOpen(!isOpen)} ><AiOutlineMenu size={20}/></button>
        <Logo />
        </header>
      <body className=" p-2 ">
        <ul className="space-y-8">
          {navigation.map((item, index) => (
            <li className={isOpen ? " mx-auto w-1/2" :"w-full"} key={index}>
              <Link className="flex items-center  gap-5" to={item.path}>
                <span className={location.pathname === item.path ? 'text-blue-500' : 'text-zinc-400'}><item.icon size={20} /></span>
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </body>
    </aside>
  )
}
