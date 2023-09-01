import { AiFillHome, AiFillCalendar, AiFillSetting } from 'react-icons/ai';
import { BsHouseCheckFill } from 'react-icons/bs';
import { HiUsers } from 'react-icons/hi';


export const navigation = [
    {
        path: '/',
        icon: AiFillHome,
        name:"Home"
    },
    {
        path: '/bookings',
        icon: AiFillCalendar,
        name:"Bookings"
    },
    {
        path: '/cabins',
        icon: BsHouseCheckFill,
        name:"Cabins"
    },
    {
        path: '/users',
        icon: HiUsers,
        name:"Users"
    },
    {
        path: '/settings',
        icon: AiFillSetting,
        name:"Settings"
    }
]