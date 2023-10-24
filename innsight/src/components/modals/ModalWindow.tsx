import { ReactNode, useContext } from "react"
import { ModalContext } from "./Modal"

export const ModalWindow:React.FC<{children:ReactNode}> = ({children}) => {
    const {isOpen,modalRef} = useContext(ModalContext)
  
    return(
      <div className={isOpen ? 'inset-0 fixed backdrop-blur-sm flex justify-center items-center z-50' : 'hidden'}>
        <div ref={modalRef} className='sm:w-screen md:w-1/2 min-h-[500px] dark:bg-zinc-950 dark:shadow-none bg-white shadow-md rounded-xl '>
            {children}
        </div>
      </div>
    )
  }
  