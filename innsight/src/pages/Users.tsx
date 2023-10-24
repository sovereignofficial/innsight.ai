import { RegisterForm } from "~/components/forms/RegisterForm"

export const Users = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Create a new user</h1>
      </div>
      <div className="dark:bg-secondary dark:shadow-none shadow-md p-5 w-10/12 mx-auto rounded-xl">
        <RegisterForm/>
      </div>
    </div>
  )
}
