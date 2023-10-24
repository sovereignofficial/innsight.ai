import { useUser } from "~/hooks/useUser"
import Form from "./Form"

export const UserDataForm: React.FC = () => {
    const { user } = useUser();
    const userData = user?.user_metadata;
    const { updateUserFn, isUpdateLoading } = useUser();

    return (
        <div className="w-1/2 mx-auto">
            <Form
                initialValues={{
                    email: user?.email,
                    avatar: userData?.avatar,
                    fullName: userData?.fullName
                }}
                onSubmitForm={(values) => updateUserFn(values)}
            >
                <div className="flex justify-center items-center w-20 h-20 rounded-full overflow-hidden">
                    <img className="w-full h-full object-cover" src={userData?.avatar || 'default-user.png'} />
                </div>
                <Form.FormInput type="text" name="avatar" label="Avatar link" placeholder="Avatar URL" />
                <Form.FormInput type="text" name="fullName" label="Full name" maxLength={60} />


                <div className="gap-2 mt-4 w-full flex items-center">
                    <Form.FormCancelBtn />
                    <Form.FormSubmitBtn isLoading={isUpdateLoading} text="Update account" />
                </div>
            </Form>
        </div>
    )
}
