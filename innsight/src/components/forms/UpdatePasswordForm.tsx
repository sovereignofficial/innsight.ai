import { useUser } from "~/hooks/useUser";
import Form from "./Form";


export const UpdatePasswordForm: React.FC = () => {
    const { user, updateUserFn,isUpdateLoading } = useUser();
    
    return (
        <div className="lg:w-1/2 mx-auto">
            <Form
                initialValues={{
                    email: user?.email,
                    currentPassword: '',
                    password: '',
                    confirmPassword: ''
                }}
                onSubmitForm={(values) => updateUserFn(values)}
            >
                <Form.FormInput type="password" name="currentPassword" label="Current password" maxLength={16} />
                <Form.FormInput type="password" name="password" label="New password" maxLength={16} />
                <Form.FormInput type="password" name="confirmPassword" label="Confirm new Password" maxLength={16} />

                <div className="gap-2 mt-4 w-full flex items-center">
                    <Form.FormCancelBtn />
                    <Form.FormSubmitBtn isLoading={isUpdateLoading} text="Update password" />
                </div>
            </Form>
        </div>
    )
}
