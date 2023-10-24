import { memo, useContext } from "react"
import { FormContext } from "./Form"
import { InputProps } from "~/types/form.d"

export const FormInput: React.FC<InputProps> = memo( ({
    type, name, label, placeholder, min, maxLength
}) => {
    const { handleChange, values } = useContext(FormContext)
    return (
        <div className='flex flex-col gap-2' >
            <label className='text-start'
                htmlFor={name}>{label}</label>
            <div className='w-full'>
                <input className='form-input w-full'
                    name={name} type={type} value={values[name]} placeholder={placeholder} min={min} maxLength={maxLength} onChange={handleChange} />
            </div>
        </div>
    )
});