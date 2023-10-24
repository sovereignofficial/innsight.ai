import Modal from '~/components/modals/Modal'
import { BiPencil } from 'react-icons/bi'
import Form from './Form'
import { guestForms } from '~/utils/app.config'
import { AiOutlineClose } from 'react-icons/ai'
import { Guest } from '~/types/guests.d'


interface EditGuestFormProps{
    guest:Guest,
    updateGuest:(guestData:{guestId:number,updatedGuest:Partial<Guest>})=>void,
    isLoading:boolean
}
export const EditGuestModalForm: React.FC<EditGuestFormProps> = ({guest,updateGuest,isLoading }) => {


    return (
        <Modal>
            <Modal.OpenModalBtn styleType={3}><BiPencil /> Edit</Modal.OpenModalBtn>
            <Modal.ModalWindow>
                <Modal.ModalHeader>
                    <h2>Edit Guest</h2>
                    <Modal.CloseModalBtn styleType={3}><AiOutlineClose size={20} /></Modal.CloseModalBtn>
                </Modal.ModalHeader>
                <Modal.ModalBody>
                    <Form
                        initialValues={{
                            ...guest
                        }}
                        onSubmitForm={(values) => {
                            updateGuest({
                                guestId:guest.id,
                                updatedGuest:{
                                    ...values
                                }
                            })
                        }}>
                        {guestForms.map((formInputs, index) => (
                            <Form.FormInput key={index}  type={formInputs.type} name={formInputs.name} label={formInputs.label} />
                        ))}
                        <div className='space-x-2'>
                            <Form.FormSubmitBtn isLoading={isLoading} text='Update guest' />
                            <Form.FormCancelBtn />
                        </div>
                    </Form>
                </Modal.ModalBody>
            </Modal.ModalWindow>
        </Modal>
    )
}
