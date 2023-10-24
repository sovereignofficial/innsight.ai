import { cabinForms } from '~/utils/app.config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { insertCabin } from '~/services/apiCabins';
import Modal from '~/components/modals/Modal';
import { AiOutlineClose } from 'react-icons/ai';
import Form from './Form';
import { initiateToast } from '~/utils/helpers';
import { useErrorHandler } from '~/hooks/useErrorHandler';
import { toastStates } from '~/types/toast.d';

export const AddCabinModalForm: React.FC = () => {
    const {handleError} = useErrorHandler()
    const queryClient = useQueryClient();

    const { mutate, isPending} = useMutation({
        mutationFn: insertCabin,
        onSuccess: () => {
            initiateToast({ state:toastStates.SUCCESS, message: "Cabin created!" });
            queryClient.invalidateQueries({
                queryKey: ['cabins']
            })
        },
        onError:(error)=>{
            handleError(error);
        }
    });


    return (
        <Modal>
            <Modal.OpenModalBtn styleType={1}>Add new cabin</Modal.OpenModalBtn>
            <Modal.ModalWindow>
                <Modal.ModalHeader>
                    <h2>Add Cabin</h2>
                    <Modal.CloseModalBtn styleType={3}><AiOutlineClose size={20} /></Modal.CloseModalBtn>
                </Modal.ModalHeader>
                <Modal.ModalBody>
                    <Form
                        initialValues={{
                            cabinName: '',
                            maxCapacity: '',
                            regularPrice: '',
                            discount: '',
                            description: '',
                            image: ''
                        }} onSubmitForm={(values) => {
                            console.log("submission")
                            mutate({
                                "name": values.cabinName,
                                "image": values.image,
                                "regularPrice": values.regularPrice,
                                "description": values.description,
                                "discount": values.discount,
                                "maxCapacity": values.maxCapacity
                            })

                        }}
                    >
                        {cabinForms.map((formInputs, index) => (
                            <Form.FormInput key={index} min={formInputs.min} maxLength={formInputs.maxLength} type={formInputs.type} name={formInputs.name} label={formInputs.label} placeholder={formInputs.placeholder} />
                        ))}
                        <div className='space-x-2'>
                            <Form.FormSubmitBtn isLoading={isPending} text='Add cabin' />
                            <Form.FormCancelBtn />
                        </div>
                    </Form>
                </Modal.ModalBody>

            </Modal.ModalWindow>
        </Modal>
    )
}