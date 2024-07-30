import DatePicker from "react-datepicker"
import { useForm } from "react-hook-form"
import { useSearchContext } from "../../context/SearchContext"
import { useAppContext } from "../../context/AppContext"
import { Navigate, useLocation, useNavigate } from "react-router-dom"

type Props = {
    hotelId: string
    pricePerNight: number

}

type GestInfoFormData = {
    checkIn: Date
    checkOut: Date
    adultCount: number
    childCount: number
}



const GuestIngoForm = ({hotelId, pricePerNight}: Props) => {
    const search = useSearchContext()
    
    const { isLogginedIn } = useAppContext()
    const navigate = useNavigate()
    const location = useLocation()

    const { watch, register, handleSubmit, setValue, formState: { errors } } = useForm<GestInfoFormData>({
        defaultValues: {
            checkIn: search.checkIn,
            checkOut: search.checkOut,
            adultCount: search.adultCount,
            childCount: search.childCount
        }
    })
    
    const checkIn = watch("checkIn")
    const checkOut = watch("checkOut")
    

    const onSignInClick = (data: GestInfoFormData) => { 
        search.saveSearchValue(
            "",
            // search.destination,
            data.checkIn,
            data.checkOut,
            data.adultCount,
            data.childCount,
        )
        navigate("/sign-in", {state: {from: location}})
    }
    const onSubmit = (data: GestInfoFormData) => { 
        search.saveSearchValue(
            "",
            // search.destination,
            data.checkIn,
            data.checkOut,
            data.adultCount,
            data.childCount,
        )
        navigate(`/hotel/${hotelId}/booking`)
    }

    return (
        <div className="flex flex-col p-4 bg-blue-200 gap-4">
            <h3 className="text-md font-bold">${pricePerNight}</h3>
            <form onSubmit={isLogginedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)}>
                <div className="grid grid-cols-1 gap-4 items-center">
                    <div>
                            <DatePicker
                            required
                            selected={checkIn}
                            onChange={(date) => setValue("checkOut", date as Date)}
                            selectsStart    
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={new Date()}
                            maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                            placeholderText="Check in Date"
                            className="min-w-full bg-white p-2 focus:outline-none"
                            wrapperClassName="min-w-full"
                        />
                        
                    </div>

                    <div>

                    <DatePicker
                            required
                            selected={checkOut}
                            onChange={(date) => setValue("checkOut", date as Date)}
                            selectsStart    
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={new Date()}
                            maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                            placeholderText="Check in Date"
                            className="min-w-full bg-white p-2 focus:outline-none"
                            wrapperClassName="min-w-full"
                            />
                    </div>



                    <div className="flex bg-white px-2 py-2 gap-2">
                <label className="items-center flex">
                    Adults: 
                <input className="w-full p-1 focus:outline-none font-bold" type="number" min={1} max={20}
                   {...register("adultCount", {
                        required: "this field is required",
                       min: {
                            value: 1,
                            message: "Minimum of 1 adult"
                       },
                       valueAsNumber: true
                    })}
                    />
                </label>
                

                <label className="items-center flex">
                    Children: 
                <input className="w-full p-1 focus:outline-none font-bold" type="number" min={0} max={20}
                    {...register("childCount", {
                        valueAsNumber: true
                    })}
                    />
                </label>
                
                        {errors.adultCount && (
                            <span className="text-red-500 text-sm font-semibold">{errors.adultCount.message}</span>
                        )}
            </div>
                    {isLogginedIn  ? (<button type="submit" className="bg-blue-600 text-white px-4 py-2 h-full rounded font-bold hover:bg-blue-500 text-xl">BookNow</button>) 
: (<button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded font-semibold">Sign in to Book</button>) }


                        </div>
                        </form>
        </div>
    )
}

export default GuestIngoForm