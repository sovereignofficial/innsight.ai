import { memo, useContext } from "react";
import { FormContext } from "./Form";
import { Button } from "../Button";

export const SubmitBtn: React.FC<{ text: string,isLoading:boolean }> = memo( ({ text,isLoading }) => {
    const { handleSubmit } = useContext(FormContext)
    return (
        <Button type={'default'} onClick={(e) => {
            e.preventDefault();
            handleSubmit();
        }} text={text} isLoading={isLoading}/>
    )
})