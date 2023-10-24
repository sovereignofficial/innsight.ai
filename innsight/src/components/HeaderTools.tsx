import { useLogout } from "~/hooks/useLogout"
import { IoLogOutOutline } from 'react-icons/io5'
import { Avatar } from "./Avatar";
import { BsPerson } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { ChangeThemeBtn } from "./ChangeThemeBtn";

export const HeaderTools: React.FC = () => {
    const navigate = useNavigate();
    const { logoutFn, isLoading } = useLogout();
    return (
        <div className="flex justify-center items-center ">
            <Avatar />
            <ChangeThemeBtn/>
            <button className="btn-header" onClick={() => { navigate('/account') }}><BsPerson size={20} /></button>
            <button disabled={isLoading} onClick={() => logoutFn()} className="btn-header"><IoLogOutOutline size={20} /></button>
        </div>
    )
}
