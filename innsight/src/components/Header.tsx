import { useReduxDispatch, useReduxSelector } from "~/hooks/reduxHooks";
import { sidebarToggle } from "~/redux/slices/appSlice";
import { HeaderTools } from "./HeaderTools";
import { Logo } from "./Logo";

export const Header = () => {
  const {sidebarOpen} = useReduxSelector(st=>st.appReducer)
  const dispatch = useReduxDispatch();
  return (
    <div className={ "w-full p-2 flex items-center gap-5 justify-end" }>
    <button className="md:hidden flex-1"
     onClick={()=>dispatch(sidebarToggle(!sidebarOpen))} ><Logo size={8} /></button>
     <HeaderTools/>
    </div>
  )
}
