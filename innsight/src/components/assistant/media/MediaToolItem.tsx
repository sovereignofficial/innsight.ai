import { ReactNode } from "react"

interface MediaToolItemProps{
    children:ReactNode
}
export const MediaToolItem:React.FC<MediaToolItemProps> = ({children}) => {
  return (
    <li className="flex justify-center items-center">{children}</li>
  )
}
