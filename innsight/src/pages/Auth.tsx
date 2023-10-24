import { ToastContainer } from "react-toastify"
import { Logo } from "~/components/Logo"
import { LoginForm } from "~/components/forms/LoginForm"

export const Auth = () => {
  return (
    <div className="page">
        <div className="page-header !flex-col !gap-10">
           <Logo size={40}/>
           <h2>Log in to your account</h2>
        </div>
        <div className="md:w-1/2 lg:w-1/3 m-auto">
          <LoginForm/>
          <ToastContainer/>
        </div>
    </div>
  )
}
