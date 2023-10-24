import { ReactNode } from "react"

export const TodayList:React.FC<{children:ReactNode}> = ({children}) => {
  return (
    <ul >
        {children}
    </ul>
  )
}
