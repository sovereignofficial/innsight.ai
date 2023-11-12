import { ReactNode, memo } from "react"

export const ChatToolItem:React.FC<{children:ReactNode,className:string}> = memo(({className,children}) => {
  return (
    <div className={className}>{children}</div>
  )
}
)