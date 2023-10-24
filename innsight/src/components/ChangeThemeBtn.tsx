import { useReduxDispatch, useReduxSelector } from "~/hooks/reduxHooks"
import {HiOutlineMoon, HiOutlineSun} from 'react-icons/hi'
import { changeTheme } from "~/redux/slices/appSlice";
import { useEffect } from "react";
import { getTheme } from "~/utils/helpers";

export const ChangeThemeBtn:React.FC = () =>{
    const {theme} = useReduxSelector(st=>st.appReducer);
    const dispatch = useReduxDispatch();

    useEffect(()=>{
        const initialTheme = getTheme();
        dispatch(changeTheme(initialTheme));
    },[])

    return (
        <button className="btn-header" onClick={()=>dispatch(changeTheme(theme === 'dark' ? 'light' : 'dark'))}>
            {theme === "dark" ? <HiOutlineSun size={20}/> : <HiOutlineMoon size={20}/>}
        </button>
    )
}