import { ReactNode } from "react"

export const StaysList:React.FC<{children:ReactNode}> = ({children}) => {
  return (
    <ul>{children}</ul>
  )
}
