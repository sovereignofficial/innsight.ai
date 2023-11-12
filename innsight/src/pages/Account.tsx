import { UpdatePasswordForm } from "~/components/forms/UpdatePasswordForm"
import { UserDataForm } from "~/components/forms/UserDataForm"

const Account: React.FC = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Account</h1>
      </div>

      <div className="dark:bg-secondary dark:shadow-none shadow-lg text-start p-10 rounded-xl">
        <div className="space-y-2">
          <h3>Update user data</h3>
          <UserDataForm />
        </div>
        <div className="mt-10 space-y-2">
          <h3>Update user password</h3>
          <UpdatePasswordForm />
        </div>
      </div>

    </div>
  )
}


export default Account;