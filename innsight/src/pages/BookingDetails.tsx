import { BookingStates } from '~/types/bookings.d'
import { useLocation, useNavigate } from 'react-router-dom'
import { BsHouseCheckFill } from 'react-icons/bs'
import { BiCheckCircle, BiDollarCircle } from 'react-icons/bi'
import { LoadingPage } from '~/components/LoadingPage'
import { useReduxSelector } from '~/hooks/reduxHooks'
import { useBooking } from '~/hooks/useBooking'
import { useGuest } from '~/hooks/useGuests'
import { format } from 'date-fns'

export const BookingDetails: React.FC<{ checkIn: boolean }> = ({ checkIn }) => {
    const location = useLocation()
    const bookingId = parseInt(location.pathname.split('/').pop()!)
    const navigate = useNavigate();

    const { hotelSettings } = useReduxSelector(st => st.appReducer);

    const {
        bookingData, isBookingLoading,checkInFn,
        confirmPayment, totalPrice, includeBreakfast,
        setConfirmPayment, setIncludeBreakfast
    } = useBooking(bookingId);

    const { guests } = useGuest();

    const guest = guests?.find(guest => guest.id === bookingData?.guestId);

    const statusBgStyle = bookingData?.status === BookingStates.UNCONFIRMED ? "bg-blue-400 text-blue-900 font-bold "
        : bookingData?.status === BookingStates.CHECKEDIN
            ? 'bg-green-400 text-green-900 font-bold' : 'bg-blue-200 text-blue-900 font-bold';

    const billBgStyle = confirmPayment && bookingData?.isPaid && bookingData.hasBreakfast === includeBreakfast
        ? "bg-green-400 text-green-900 "
        : "bg-yellow-200 text-yellow-900 "



    return (
        <div className='page'>
            <div className='page-header'>
                <div className='flex gap-6 items-center'>
                    <h1>Booking #{bookingId}</h1>
                    <span className={`px-3 py-1 uppercase text-sm rounded-full ${statusBgStyle}`}>{bookingData?.status}</span>
                </div>
                <button onClick={() => navigate(-1)} className='btn-outlined'>← Back</button>
            </div>

            <div className='dark:bg-secondary dark:shadow-none shadow-lg w-full min-h-[400px]  relative overflow-hidden rounded-xl space-y-10'>
                {isBookingLoading ? <LoadingPage /> : (
                    <>
                        <section className='flex justify-between items-center bg-primary-500 text-white sm:px-3 lg:px-10 p-3 rounded-t-xl'>
                            <div className='flex justify-center items-center gap-5'>
                                <BsHouseCheckFill size={35} />
                                <p className='lg:text-xl font-medium'>{bookingData?.numNigths} nights in Cabin <strong>{bookingData?.cabins?.name}</strong></p>
                            </div>
                            <div className='flex justify-center items-center lg:gap-5'>
                                <p className='lg:text-xl font-medium'>{bookingData?.bookingDates?.formattedStartDate} ({bookingData?.bookingDates?.bookingInfo.arrive})</p>
                                -
                                <p className='lg:text-xl font-medium'>{bookingData?.bookingDates?.formattedEndDate}</p>
                            </div>
                        </section>
                        <div className='flex sm:flex-col lg:flex-row lg:gap-3 lg:ml-5'>
                            <span className='flex sm:justify-center lg:justify-start items-center gap-3'>
                                <div className='w-10 h-5 mt-1 rounded-sm relative overflow-hidden'>
                                    <img className='w-full h-full object-cover' src={guest?.countryFlag || ''} />
                                </div>
                                <p className='font-bold'>{guest?.fullName}</p>
                                <p className='font-medium'>+ {bookingData?.numGuests} guests</p>
                            </span>
                            •
                                <p className='text-zinc-400'>{guest?.email}</p>
                            •
                                <p className='text-zinc-400'>National ID {guest?.nationalID}</p>
                        </div>
                        <div className='flex gap-3 items-center ml-5'>
                            <BiCheckCircle />
                            <span className='flex gap-3 items-center'>
                                <h4>Breakfast included?</h4>
                                <p className='font-medium'>{bookingData?.hasBreakfast ? "Yes" : "No"}</p>
                            </span>
                        </div>

                        <div className={`flex justify-between items-center sm:w-11/12 lg:w-10/12 mx-auto p-5 rounded-lg ${billBgStyle}`}>
                            <span className='flex gap-3 items-center'>
                                <BiDollarCircle size={22} />
                                <h4>Total Price</h4>
                                <p className='font-medium'>{includeBreakfast ? `$${totalPrice} ($${bookingData?.cabinPrice} + $${bookingData?.numNigths! * hotelSettings?.breakfastPrice * bookingData?.numGuests!})` : `$${bookingData?.cabinPrice}`}</p>
                            </span>
                            <h4>{confirmPayment && bookingData?.isPaid && bookingData.hasBreakfast === includeBreakfast ? "Paid" : "Will Pay at Property"}</h4>
                        </div>
                        <div className='text-end p-5'>
                            <p className='text-zinc-400'>Booked on {format( new Date(bookingData?.created_at!),'eee dd MMMM yyyy HH:mm')}</p>
                        </div>
                    </>
                )}

            </div>

            {checkIn && (
                <div className='space-y-5'>
                    <div className='flex items-center gap-3 p-6 dark:bg-secondary dark:shadow-none shadow-lg rounded-lg pl-10'>
                        <input className='w-5 h-5' type='checkbox'
                            onChange={() => setIncludeBreakfast(!includeBreakfast)} checked={includeBreakfast} disabled={bookingData?.hasBreakfast === true} />
                        <p>Want to add breakfast for ${bookingData?.numNigths! * hotelSettings?.breakfastPrice * bookingData?.numGuests!}?</p>
                    </div>
                    <div className='flex items-center gap-3 p-6 dark:bg-secondary dark:shadow-none shadow-lg rounded-lg pl-10'>
                        <input className='w-5 h-5' type='checkbox' disabled={confirmPayment && bookingData?.isPaid && includeBreakfast === bookingData.hasBreakfast}
                            onChange={() => setConfirmPayment(!confirmPayment)} checked={confirmPayment} />
                        <p>I confirm that {guest?.fullName} has paid the total amount.</p>
                    </div>

                    <div className='text-end space-x-4'>
                        <button onClick={() => checkInFn(bookingData?.id!)}
                            disabled={bookingData?.status === BookingStates.CHECKEDIN || !confirmPayment}
                            className='btn'>Check in booking #{bookingData?.id}</button>
                        <button onClick={() => navigate(-1)} className='btn-outlined'>Back</button>
                    </div>
                </div>
            )}
        </div>
    )
}