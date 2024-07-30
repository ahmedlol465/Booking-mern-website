import { useQuery } from "react-query"
import * as apiClient from "../api-clients"

const MyBookings = () => {
    const { data: hotels } = useQuery("fetchMyHotels", apiClient.fetchMyBooking)
        
    if (!hotels || hotels.length === 0) {
        return <span>No bookings found</span>
    }

    return (
<div className="space-y-5 p-4 lg:p-8">
  <h1 className="text-3xl font-bold">My Bookings</h1>
  {hotels.map((hotel) => (
    <div key={hotel._id} className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-6 gap-5">
      <div className="lg:w-full lg:h-[250px]">
        <img src={hotel.imageUrls[0]} alt={hotel.name} className="w-full h-full object-cover object-center rounded-lg" />
      </div>
      <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
        <div className="text-2xl font-bold">
          {hotel.name}
          <div className="text-xs font-normal text-gray-600">
            {hotel.city}, {hotel.country}
          </div>
        </div>
        {hotel.bookings.length > 0 && (
          <div className="p-2 border-b border-gray-300">
            <div className="text-sm">
              <span className="font-bold mr-2">Dates:</span>
              <span>{new Date(hotel.bookings[0].checkIn).toLocaleDateString()} - {new Date(hotel.bookings[0].checkOut).toLocaleDateString()}</span>
            </div>
            <div className="text-sm">
              <span className="font-bold mr-2">Guests:</span>
              <span>{hotel.bookings[0].adultCount} adults, {hotel.bookings[0].childCount} children</span>
            </div>
          </div>
        )}
      </div>
    </div>
  ))}
</div>

    
    )

}

export default MyBookings