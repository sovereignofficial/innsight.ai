import { ReactNode, memo } from "react"

export const ChatTools: React.FC<{ children: ReactNode }> = memo(({ children }) => {
  return (
    <div className="sm:w-full md:w-2/3 bg-gradient-to-r from-primary-500 to-red-500 p-1  animate-gradient-x  grid place-items-center rounded-md mx-auto">
      <div className="w-full p-1 bg-gray-700 rounded-md grid grid-flow-col grid-cols-12 items-center">
        {children}
      </div>
    </div>
  )
})