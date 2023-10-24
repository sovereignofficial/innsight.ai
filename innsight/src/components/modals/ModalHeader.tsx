import { ReactNode } from "react"

export const ModalHeader:React.FC<{children:ReactNode}> = ({children}) => {
    return(
      <div className='w-full px-6 py-4 flex justify-between items-center border-b dark:border-zinc-800 border-zinc-300'>
        {children}
      </div>
    )
  }
  