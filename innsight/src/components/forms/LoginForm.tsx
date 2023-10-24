import { useMutation } from "@tanstack/react-query"
import { login } from "~/services/apiAuth"
import Form from "./Form"
import { initiateToast } from "~/utils/helpers";
import { useErrorHandler } from "~/hooks/useErrorHandler";
import { toastStates } from "~/types/toast.d";

export const LoginForm: React.FC = () => {
    const {handleError} = useErrorHandler();
    const { mutate: loginFn,isPending } = useMutation({
        mutationFn: login,
        mutationKey: ['login'],
        onSuccess:()=>{
            initiateToast({state:toastStates.SUCCESS,message:"You have been signed in successfully!"})
            location.replace('/')
        },
        onError:(err)=>{
            handleError(err);
        }
    })


    return (
        <div className="dark:bg-secondary dark:shadow-none shadow-lg p-5 rounded-xl">
            <Form
                initialValues={{
                    email: '',
                    password: ''
                }}
                onSubmitForm={(values) => loginFn(values)}
            >
                <Form.FormInput type="email" label="Email address" name="email" />
                <Form.FormInput type="password" label="Password" name="password" />
                <Form.FormSubmitBtn text="Login" isLoading={isPending} />
            </Form>
        </div>
    )
}