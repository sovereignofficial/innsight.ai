import { ReactNode, memo } from "react"

export const ChatFeed:React.FC<{children:ReactNode}> = memo(({children}) => {
  return (
    <div id="chat" className="w-full h-[500px] p-5 relative overflow-y-scroll space-y-2  ">{children}</div>
  )
}
)