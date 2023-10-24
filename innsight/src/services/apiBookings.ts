import { getToday, handleBookingDates } from "~/utils/helpers";
import { supabaseClient } from "./supabase";
import { Booking } from "~/types/bookings.d";

export async function getBookings():Promise<Booking[]> {
  let { data, error } = await supabaseClient.from('bookings').select('*,cabins(*),guests(*)');

  if (error) throw new Error(error.message);
  if (!data) throw new Error('An error happened while fetching bookings');
  const bookings = data.map(booking => {
    const bookingDates = handleBookingDates(booking.startDate, booking.endDate);
    return { ...booking, bookingDates }
  })
  console.log({bookings});
  return bookings
}

export async function getBookingById(bookingId: number): Promise<Booking> {
  let { data, error } = await supabaseClient.from('bookings').select('*,cabins(*),guests(*)').eq('id', bookingId);

  if (error) throw new Error(error.message);
  if (!data) throw new Error('An error happened while fetching booking');

  const bookingDates = handleBookingDates(data[0].startDate, data[0].endDate);
  const booking: Booking = {
    ...data[0],
    bookingDates
  }
  return booking
}

export async function updateBooking(bookingId: number, updatedBooking: Partial<Booking>): Promise<void> {
  let { error } = await supabaseClient.from('bookings').update(updatedBooking).eq('id', bookingId);

  if (error) throw new Error(error.message);
}

export async function deleteBooking(bookingId: number): Promise<void> {
  let { error } = await supabaseClient.from('bookings').delete().eq('id', bookingId);

  if (error) throw new Error(error.message);
}


export async function getRecentBookingsByDate(date:string):Promise<{
  createdBookings:Booking[],
  salesAndCheckIns:Booking[],
  checkedOutBookings:Booking[]
}>{
  const today = getToday({end:true});

  const {data:createdBookings,error:createdBookingsError} = await supabaseClient
  .from('bookings')
  .select('*')
  .gte('created_at',date)
  .lte('created_at',today)

  if(createdBookingsError) throw new Error(createdBookingsError.message)

  const {data:salesAndCheckIns,error:salesError} = await supabaseClient
  .from('bookings')
  .select('*')
  .gte('checkInDate',date)
  .lte('checkInDate',today);

  if(salesError) throw new Error(salesError.message);

  const {data:checkedOutBookings, error:checkOutsError} = await supabaseClient
  .from('bookings')
  .select('*')
  .gte('checkOutDate',date)
  .lte('checkOutDate',today);

  if(checkOutsError) throw new Error(checkOutsError.message);
  
  return {
    createdBookings,
    salesAndCheckIns,
    checkedOutBookings
  }

}

export async function getStaysAfterDate(date:string){
  const {data,error} = await supabaseClient
  .from("bookings")
  .select("*,guests(fullName)")
  .gte("startDate",date)
  .lte("startDate",getToday({end:true}));

  if(error) throw new Error(error.message);
  if(!data) throw new Error('Could not fetched recent stays.')

  return data as Booking[]
}

export async function getActiveStays() {
  const { data, error } = await supabaseClient
    .from("bookings")
    .select("*, guests(fullName),cabins(name)")
    .lte("startDate", getToday({ end: true })) // before today
    .gte("endDate", getToday({ end: true })) // ended after today

  if (error) throw new Error(error.message);
  if (!data) throw new Error("Could not fetch recent stays.");

  return data as Booking[];
}



export async function getTodaysActivity():Promise<{
  checkInActivities:Booking[],
  checkOutActivities:Booking[]
}>{
   const {data:checkInActivities,error:checkInActivityError} = await supabaseClient
   .from('bookings')
   .select('*,guests(*)')
   .gte('startDate',getToday({end:false}))
   .lte('startDate',getToday({end:true}))

   if(checkInActivityError) throw new Error(checkInActivityError.message);

   const {data:checkOutActivities,error:checkOutActivityError} = await supabaseClient
   .from('bookings')
   .select('*,guests(*)')
   .gte('endDate',getToday({end:false}))
   .lte('endDate',getToday({end:true}))

   if(checkOutActivityError) throw new Error(checkOutActivityError.message);
  

   return {checkInActivities,checkOutActivities} 
}