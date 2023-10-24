import { ReactNode } from "react"

export const ModalBody:React.FC<{children:ReactNode}> = ({children}) => {
    return(
      <div className='w-full max-h-[450px] overflow-y-scroll relative p-7'>
        {children}
      </div>
    )
  }