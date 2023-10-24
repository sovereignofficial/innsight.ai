import { useFormik } from 'formik';
import { FormInput } from './FormInput';
import { SubmitBtn } from './FormSubmitBtn';
import { createContext, useCallback } from 'react';
import { FormCancelBtn } from './FormCancelBtn';
import { FormContextInterface, FormType } from '~/types/form.d';

export const FormContext = createContext<FormContextInterface>({
    values: {},
    handleChange: () => { },
    handleSubmit: () => { },
    handleCancel:()=>{},
});


const Form: FormType = ({ children, onSubmitForm, initialValues }) => {
    const formik = useFormik({
        enableReinitialize:true,
        initialValues,
        onSubmit: (values,{resetForm}) => {
            console.log("Form onSubmit - values:", values); // Debug statement
            onSubmitForm(values);
            resetForm();
        }
    })

    const handleSubmit = useCallback((e?: React.FormEvent<HTMLFormElement> | undefined) => {
        formik.handleSubmit(e);
    },[formik.handleSubmit]);
    
    return (
        <FormContext.Provider value={{ values: formik.values, handleChange: formik.handleChange, handleSubmit,handleCancel:formik.resetForm }}>
            <form className='form'>
                {children}
            </form>
        </FormContext.Provider>
    )
}

Form.FormInput = FormInput;
Form.FormSubmitBtn = SubmitBtn;
Form.FormCancelBtn = FormCancelBtn;

export default Form