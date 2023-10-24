import { memo, useContext } from "react"
import { FormContext } from "./Form"

export const FormCancelBtn: React.FC = memo( () => {
  const { handleCancel } = useContext(FormContext)
  return (
    <button className="btn-outlined" onClick={(e) => {
      e.preventDefault();
      handleCancel();
    }}>Cancel</button>
  )
})
