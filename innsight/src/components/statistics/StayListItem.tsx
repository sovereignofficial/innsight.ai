import { ReactNode } from "react"

export const StayListItem:React.FC<{children:ReactNode,onClick:()=>void}> = ({children,onClick}) => {
  return (
    <li onClick={onClick} className="cursor-pointer grid grid-cols-3 p-2 dark:hover:bg-zinc-800 hover:bg-zinc-100">
        {children}
    </li>
  )
}
