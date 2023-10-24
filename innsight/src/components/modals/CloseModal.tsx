import { ReactNode, useContext } from "react";
import { ModalContext } from "./Modal";
import { BtnStyleType } from "~/types/modal.d";

export const CloseModalBtn:React.FC<{children:ReactNode,styleType:BtnStyleType}> = ({children,styleType})=> {
    const {closeModal} = useContext(ModalContext)
  
    const className = styleType == 1 ? 'btn' : styleType  == 2 ? 'btn-outlined' : '';
  
    return(
      <button className={className} onClick={()=> closeModal()}>{children}</button>
    )
  }