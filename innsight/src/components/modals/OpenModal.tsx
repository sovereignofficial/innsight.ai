import { ReactNode, useContext } from "react";
import { ModalContext } from "./Modal";
import { BtnStyleType } from "~/types/modal";

export const OpenModalBtn:React.FC<{children:ReactNode,styleType:BtnStyleType}> = ({children,styleType}) => {
    const {openModal} = useContext(ModalContext);
    
    const className = styleType == 1 ? 'btn' : styleType  == 2 ? 'btn-outlined' : 'flex justify-center items-center gap-1 p-1 w-full';
  
    return(
      <button className={className} onClick={()=>{
        console.log("modal is getting displayed...")
        openModal()
      }}>{children}</button>
    )
  }