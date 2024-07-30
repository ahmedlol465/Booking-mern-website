import { useQuery } from "react-query"
import * as apiClint from "../api-clients"
import BookingForm from "../forms/BookingForm/BookingForm"
import { useSearchContext } from "../context/SearchContext"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import BookingDetailsSummary from "../components/BookingDetailsSummary"
import { log } from "console"
import { Elements } from "@stripe/react-stripe-js"
import { useAppContext } from "../context/AppContext"


const Booking = () => {

    const { stripePromise} =useAppContext()

    const search = useSearchContext()
    const {hotelId } = useParams()




    const { data: hotel } = useQuery("fetchHotelById", () => apiClint.fetchHotelById(hotelId as string), {
        enabled: !!hotelId
    })
 
    const [numberOfNights, setNumberOfNights] = useState<number>(0)

    useEffect(() => {
        if(search.checkIn && search.checkOut) {
            const nights = Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) / (1000 * 60 * 60 * 24);
            
            setNumberOfNights(Math.ceil(nights))
        }
    }, [search.checkIn, search.checkOut])

    const { data: paymentIntentData } = useQuery("createPaymentIntent", () => apiClint.createPaymenyIntent(hotelId as string, numberOfNights.toString()), {
        enabled: !!hotelId && numberOfNights > 0
    })


    const { data: currentUser } = useQuery("fetchCurrentUser", 
        apiClint.fetchCurrentUser
    )

    if(!hotel) return <div>no hotel found</div>


    //payment intent
 
    
    return (
        <div className="grid md:grid-cols-[1fr_2fr]">
            <BookingDetailsSummary checkIn={search.checkIn} checkOut={search.checkOut} adultCount={search.adultCount} childCount={search.childCount} numberOfNights={numberOfNights}  hotel={hotel}/>
            {
                currentUser && paymentIntentData && (
                    <Elements stripe={stripePromise} options={{
                        clientSecret: paymentIntentData.clientSecret
                    }}>
                        <BookingForm currentUser={currentUser}  paymentIntent={paymentIntentData}/>
                    </Elements>
                    
                )}
        </div>
        
    )
}


export default Booking