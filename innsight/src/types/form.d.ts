export interface FormContextInterface {
    values: any
    handleChange: (e: React.ChangeEvent<any>) => void,
    handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void
    handleCancel:()=>void,
}

export interface InputProps {
    type: string,
    name: string,
    label: string,
    placeholder?: string,
    min?: string | number,
    maxLength?: number,

}

export interface FormProps {
    children: ReactNode,
    initialValues: any
    onSubmitForm: (values: any) => void
}

export type FormType = React.FC<FormProps> & {
    FormInput: React.FC<InputProps>,
    FormSubmitBtn: React.FC<{ text: string, isLoading:boolean }>,
    FormCancelBtn:React.FC
}
