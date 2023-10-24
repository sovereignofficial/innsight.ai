import { useRegister } from "~/hooks/useRegister"
import Form from "./Form"

export const RegisterForm: React.FC = () => {
    const { registerFn,isPending } = useRegister()

    
    return (
        <div className="w-11/12 mx-auto">
            <Form
                initialValues={{
                    email: '',
                    fullName: '',
                    password: '',
                    confirmPassword: ''
                }}
                onSubmitForm={(values) => registerFn(values)}
            >
                <Form.FormInput type="email" label="Email address" name="email" />
                <Form.FormInput type="text" label="Full name" name="fullName" />
                <Form.FormInput type="password" label="Password" name="password" />
                <Form.FormInput type="password" label="Confirm password" name="confirmPassword" />
                <div className="flex justify-start gap-3 mt-5">
                    <Form.FormCancelBtn />
                    <Form.FormSubmitBtn isLoading={isPending} text="Create user" />
                </div>
            </Form>
        </div>
    )
}
