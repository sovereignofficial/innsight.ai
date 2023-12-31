import { RegisterForm } from "~/components/forms/RegisterForm"

const Users:React.FC = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Create a new user</h1>
      </div>
      <div className="dark:bg-secondary dark:shadow-none shadow-lg p-5 w-full mx-auto rounded-xl">
        <RegisterForm />
      </div>
    </div>
  )
}

export default Users;