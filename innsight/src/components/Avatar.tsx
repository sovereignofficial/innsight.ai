import { useUser } from "~/hooks/useUser"


export const Avatar:React.FC = () => {
    const {user} = useUser();
    const userData = user?.user_metadata

    return (
    <div className="flex justify-center items-center gap-2 sm:mr-3 lg:mr-5">
        <div className="flex justify-center items-center aspect-square rounded-full w-10 h-10 overflow-hidden">
            <img className="w-full h-full object-cover" src={userData?.avatar || 'default-user.png'}/>
        </div>
        <div>
            <p >{userData?.fullName}</p>
        </div>
    </div>
  )
}
