export enum BtnStyleStates {
    DEF = 1,
    OUTLINED = 2,
    NONE = 3
}

export type BtnStyleType = BtnStyleStates.DEF | BtnStyleStates.OUTLINED | BtnStyleStates.NONE

export type ModalType = React.FC<{ children: ReactNode }> & {
    OpenModalBtn: React.FC<{ children: ReactNode, styleType: BtnStyleType }>,
    CloseModalBtn: React.FC<{ children: ReactNode, styleType: BtnStyleType }>,
    ModalWindow: React.FC<{ children: ReactNode }>,
    ModalHeader: React.FC<{ children: ReactNode }>,
    ModalBody: React.FC<{ children: ReactNode }>,
    ModalFooter: React.FC<{ children: ReactNode }>
}
export interface ModalContextInterface {
    isOpen: boolean,
    openModal: () => void,
    closeModal: () => void,
    modalRef: MutableRefObject<any> | null
}
