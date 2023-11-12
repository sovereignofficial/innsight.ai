import { AiOutlineHome, AiOutlineCalendar, AiOutlineSetting, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { GiArtificialHive } from 'react-icons/gi'
import { BsHouseCheck } from 'react-icons/bs';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { CabinFormInitial } from '~/types/cabins.d';

export const navigation = [
    {
        path: '/dashboard',
        icon: AiOutlineHome,
        name: "Home"
    },
    {
        path: '/assistant',
        icon: GiArtificialHive,
        name: "Assistant"
    },
    {
        path: '/bookings',
        icon: AiOutlineCalendar,
        name: "Bookings"
    },
    {
        path: '/cabins',
        icon: BsHouseCheck,
        name: "Cabins"
    },
    {
        path: '/guests',
        icon: HiOutlineUserGroup,
        name: "Guests"
    },
    {
        path: '/users',
        icon: AiOutlineUsergroupAdd,
        name: "Users"
    },
    {
        path: '/settings',
        icon: AiOutlineSetting,
        name: "Settings"
    }
]

export const cabinForms = [
    {
        type: 'text',
        label: 'Cabin name',
        name: 'cabinName' as keyof CabinFormInitial,
        placeholder: '1000',
        maxLength: 4

    },
    {
        type: 'number',
        label: 'Maximum capacity',
        name: 'maxCapacity' as keyof CabinFormInitial,
        min: 0,
    },
    {
        type: 'number',
        label: 'Regular price',
        name: 'regularPrice' as keyof CabinFormInitial,
        min: 0
    },
    {
        type: 'number',
        label: 'Discount',
        name: 'discount' as keyof CabinFormInitial,
        min: 0
    },
    {
        type: 'text',
        label: 'Description',
        name: 'description' as keyof CabinFormInitial,
        placeholder: 'Luxury cabin in the woods'
    },
    {
        type: 'text',
        label: 'Image address',
        name: 'image' as keyof CabinFormInitial,
        placeholder: 'Image URL'
    },
]

export const guestForms = [
    {
        type: 'text',
        label: 'Full name',
        name: 'fullName',
    },
    {
        type: 'text',
        label: 'Email',
        name: 'email',
    },
    {
        type: 'text',
        label: 'Nationality',
        name: 'nationality',
    },
    {
        type: 'text',
        label: 'National ID',
        name: 'nationalID',
    },
    {
        type: 'text',
        label: 'Country flag',
        name: 'countryFlag',
    }
]

export const cabinHeaders = [
    '',
    'cabin',
    'capacity',
    'price',
    'discount',
    ''
]

export const bookingsHeaders = [
    'cabin',
    'guest',
    'dates',
    'status',
    'amount',
    ''
]


export const settingsForm: {
    type: string,
    label: string,
    name: string,
}[] = [
        {
            type: 'number',
            label: 'Minimum booking length',
            name: 'minBookingLength',
        },
        {
            type: 'number',
            label: 'Maximum booking length',
            name: 'maxBookingLength',
        },
        {
            type: 'number',
            label: 'Max guests per booking',
            name: 'maxGuestsPerBooking',
        },
        {
            type: 'number',
            label: 'Breakfast price',
            name: 'breakfastPrice',
        }
    ]