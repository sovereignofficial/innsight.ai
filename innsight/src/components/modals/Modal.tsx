import  { createContext, useEffect, useRef, useState } from 'react'
import { CloseModalBtn } from './CloseModal';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';
import { ModalHeader } from './ModalHeader';
import { ModalWindow } from './ModalWindow';
import { OpenModalBtn } from './OpenModal';
import { ModalContextInterface, ModalType } from '~/types/modal.d';




export const ModalContext = createContext<ModalContextInterface>({
  isOpen:false,
  openModal:()=>{},
  closeModal:()=>{},
  modalRef:null
})

const Modal:ModalType = ({children}) => {
  const [isOpen,setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>();

  const openModal = ()=> setIsOpen(true);
  const closeModal = ()=> setIsOpen(false);

  useEffect(()=>{
    const handleClickOutside = (event:React.MouseEvent<Document>) => {
      if (!modalRef.current || modalRef.current.contains(event.target as Node) ) {
        return;
      }
      closeModal();
    };

    document.addEventListener('mousedown', handleClickOutside as unknown as EventListener);
    document.addEventListener('touchstart', handleClickOutside as unknown as EventListener );

    return () => {
      document.removeEventListener('mousedown', handleClickOutside as unknown as EventListener);
      document.removeEventListener('touchstart', handleClickOutside as unknown as EventListener);
    };
  },[])
  
  return (
    <ModalContext.Provider value={{isOpen,openModal,closeModal,modalRef}}>
      {children}
    </ModalContext.Provider>
  )
}

Modal.OpenModalBtn = OpenModalBtn;
Modal.CloseModalBtn = CloseModalBtn;
Modal.ModalWindow = ModalWindow;
Modal.ModalHeader = ModalHeader;
Modal.ModalBody = ModalBody;
Modal.ModalFooter = ModalFooter;

export default Modal