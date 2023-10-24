import { Cabin } from "./cabins.d";
import { Guest } from "./guests.d";

export type Booking = {
    "id"?: number,
    "created_at": string,
    "startDate": string,
    "endDate": string,
    "checkInDate":string | null,
    'checkOutDate':string | null,
    "numNigths": number,
    "numGuests": number,
    "cabinPrice"?: number,
    "extrasPrice"?: number,
    "totalPrice": number,
    "status": BookingStatus
    "hasBreakfast"?: boolean,
    "isPaid"?: boolean,
    "observations"?: string,
    "cabinId"?: number,
    "guestId"?: number,
    "cabins"?: Cabin,
    "guests"?: Guest,
    "bookingDates"?: {
        formattedStartDate: string,
        formattedEndDate: string,
        bookingInfo: {
            arrive: string,
            numberOfStays: number
        }
    }

}

export enum BookingStates {
    UNCONFIRMED = "unconfirmed",
    CHECKEDIN = 'checked-in',
    CHECKEDOUT = 'checked-out'
}

export type BookingStatus = BookingStates.UNCONFIRMED | BookingStates.CHECKEDIN | BookingStates.CHECKEDOUT