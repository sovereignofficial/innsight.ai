import { ReactNode } from "react"

export const ModalFooter:React.FC<{children:ReactNode}> = ({children}) => {
    return(
      <div className='w-full p-3 flex justify-center items-center gap-2 border-t dark:border-zinc-800 border-zinc-300'>
        {children}
      </div>
    )
  }