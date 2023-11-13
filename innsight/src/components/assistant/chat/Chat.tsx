import { ReactNode, memo } from "react"

export const Chat: React.FC<{ children: ReactNode }> = memo(({ children }) => {
  return (
    <div className={`mx-auto w-full h-full text-white`}>
        {children}
    </div>
  )
}
)