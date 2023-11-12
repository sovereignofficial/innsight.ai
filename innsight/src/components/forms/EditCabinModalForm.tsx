import Modal from '~/components/modals/Modal'
import { BiPencil } from 'react-icons/bi'
import Form from './Form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cabinForms } from '~/utils/app.config'
import { updateCabin } from '~/services/apiCabins'
import { AiOutlineClose } from 'react-icons/ai'
import { initiateToast } from '~/utils/helpers'
import { useErrorHandler } from '~/hooks/useErrorHandler'
import { toastStates } from '~/types/toast.d'
import { Cabin } from '~/types/cabins.d'

export const EditCabinModalForm: React.FC<{ cabin: Cabin }> = ({ cabin }) => {
    const { handleError } = useErrorHandler();
    const queryClient = useQueryClient();

    const { mutate, isPending} = useMutation({
        mutationFn: updateCabin,
        onSuccess: () => {
            initiateToast({ state:toastStates.SUCCESS, message: "Cabin updated!" });
            queryClient.invalidateQueries({
                queryKey: ['cabins']
            })
        },
        onError:(error)=>{
            handleError(error)
        }
    })

    return (
        <Modal>
            <Modal.OpenModalBtn styleType={3}><BiPencil /> Edit</Modal.OpenModalBtn>
            <Modal.ModalWindow>
                <Modal.ModalHeader>
                    <h2>Edit Cabin</h2>
                    <Modal.CloseModalBtn styleType={3}><AiOutlineClose size={20} /></Modal.CloseModalBtn>
                </Modal.ModalHeader>
                <Modal.ModalBody>
                    <Form
                        initialValues={{
                            cabinName: cabin.name,
                            maxCapacity: cabin.maxCapacity,
                            regularPrice: cabin.regularPrice,
                            discount: cabin.discount,
                            description: cabin.description,
                            image: cabin.image
                        }}
                        onSubmitForm={(values) => {
                            const args = {
                                cabinId: cabin.id,
                                newValues: {
                                    "name": values.cabinName,
                                    "image": values.image,
                                    "regularPrice": values.regularPrice,
                                    "description": values.description,
                                    "discount": values.discount,
                                    "maxCapacity": values.maxCapacity
                                }
                            }
                            mutate(args)
                        }}>
                        {cabinForms.map((formInputs, index) => (
                            <Form.FormInput key={index} min={formInputs.min} maxLength={formInputs.maxLength} type={formInputs.type} name={formInputs.name} label={formInputs.label} />
                        ))}
                        <div className='space-x-2'>
                            <Form.FormSubmitBtn isLoading={isPending} text='Update cabin' />
                            <Form.FormCancelBtn />
                        </div>
                    </Form>
                </Modal.ModalBody>
            </Modal.ModalWindow>
        </Modal>
    )
}
