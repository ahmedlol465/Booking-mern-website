import { useForm } from "react-hook-form"
import { PaymentIntentResponse, UserType } from "../../../../backEnd/src/shared/types"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { StripeCardElement } from "@stripe/stripe-js"
import { useSearchContext } from "../../context/SearchContext"
import { useParams } from "react-router-dom"
import { useMutation } from "react-query"
import * as apiClient from "../../api-clients"
import { useAppContext } from "../../context/AppContext"
type Props = {
    currentUser: UserType
    paymentIntent: PaymentIntentResponse
}

export type BookingFormData = {
    firstName: string
    lastName: string
    email: string
    hotelId: string
    adultCount: number
    childCount: number
    checkIn: string
    checkOut: string
    paymentIntentId: string
    totalCoast: number
}
const BookingForm = ({ currentUser, paymentIntent }: Props) => {
    

    const stripe = useStripe()
    const elements = useElements()
    
    const search = useSearchContext()
    const {hotelId} = useParams()

    const { showToast } = useAppContext()

    const { mutate: bookRoom , isLoading} = useMutation(apiClient.createBooking, {

        onSuccess: () => {
            showToast({message: "Booking Saved!", type: "SUCCESS"})  
        },

        onError: () => {
            showToast({message: "Error Booking Saved", type: "ERROR"})
        }
    })
    const { handleSubmit, register } = useForm<BookingFormData>({
        defaultValues: {
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
            hotelId,
            adultCount: search.adultCount,
            childCount: search.childCount,
            checkIn: search.checkIn.toISOString(),
            checkOut: search.checkOut.toISOString(),
            totalCoast: paymentIntent.totalCoast,
            paymentIntentId: paymentIntent.paymentIntent,
        }
    })

    const onSubmit = async (formData: BookingFormData) => {
        if(!stripe || !elements) {
            return 
        }
        const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement) as StripeCardElement
            }
        })
        
        if (result.paymentIntent?.status === "succeeded") {
            // book the room 
            bookRoom({...formData, paymentIntentId: result.paymentIntent.id})
        }
    }


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gird-cols-1 gap-5 rounded-lg border border-salat-300 p-5">
            <span className="text-3xl font-bold">Confirm Your Details</span>
            <div className="grid grid-cols-2 gap-6">
                <label className="text-sm text-gray-700 flex-1 font-bold">
                    First Name
                    <input className="mt-1 border rounded w-full py-2 px-3 font-normal text-gray-700 bg-gray-200"
                        type="text"
                        readOnly
                        disabled
                        {...register("firstName")}
                    />
                </label>
                <label className="text-sm text-gray-700 flex-1 font-bold">
                    Last Name
                    <input className="mt-1 border rounded w-full py-2 px-3 font-normal text-gray-700 bg-gray-200"
                        type="text"
                        readOnly
                        disabled
                        {...register("lastName")}
                    />
                </label>
                <label className="text-sm text-gray-700 flex-1 font-bold">
                    Email
                    <input className="mt-1 border rounded w-full py-2 px-3 font-normal text-gray-700 bg-gray-200"
                        type="text"
                        readOnly
                        disabled
                        {...register("email")}
                    />
                </label>


            </div>



            <div className="space-y-2">
                <h2 className="text-xl font-semibold">Your Price Summary</h2>

                <div className="bg-blue-200 p-4 rounded-md">
                <div className="font-semibold text-lg">
                    Total Cost: ${(paymentIntent.totalCoast / 100).toFixed(2)}
                </div>
                <div className="text-xs">
                    Includes taxes and charges
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <h3 className="text-xl font-semibold">Payment Details</h3>
                <CardElement id="payment-element" className="border border-salat-300 rounded-md p-2 text-sm"/>
            </div>
            
            <div className="flex justify-end">
                <button disabled={isLoading} type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-md disabled:bg-gray-500">
                    {isLoading ? "Loading..." : "Confirm Booking"}
                    
                </button>
            </div>
        </form>
    )
}


export default BookingForm