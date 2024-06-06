import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>(); 

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>

            <label className=" text-gray-700 text-sm font-bold flex-1">
                    Name
                    <input 
                        type="text"
                        className="border rounded w-full py-1 px-2 font-normal" 
                        {...register("name", {required: "this field is required "})}></input>
                         {errors.name && (
                            <span className="text-red-500">{errors.name.message}</span>
                        )}
                    </label>

                    <div className="flex gap-4">

            <label className=" text-gray-700 text-sm font-bold flex-1">
                    city
                    <input 
                        type="text"
                        className="border rounded w-full py-1 px-2 font-normal" 
                        {...register("city", {required: "this field is required "})}></input>
                         {errors.city && (
                            <span className="text-red-500">{errors.city.message}</span>
                        )}
                    </label>

                    <label className=" text-gray-700 text-sm font-bold flex-1">
                    country
                    <input 
                        type="text"
                        className="border rounded w-full py-1 px-2 font-normal" 
                        {...register("country", {required: "this field is required "})}></input>
                         {errors.country && (
                            <span className="text-red-500">{errors.country.message}</span>
                        )}
                    </label>


                    </div>

                    
            <label className=" text-gray-700 text-sm font-bold flex-1">
                    Description
                    <textarea 
                         rows ={10}
                        className="border rounded w-full py-1 px-2 font-normal" 
                        {...register("descripton", {required: "this field is required "})}>
                        </textarea>
                         {errors.descripton && (
                            <span className="text-red-500">{errors.descripton.message}</span>
                        )}
                    </label>


            <label className=" text-gray-700 text-sm font-bold max-w-[50%]">
                    pricePerNight
                    <input 
                        type="number"

                        min={1}
                        className="border rounded w-full py-1 px-2 font-normal" 
                        {...register("pricePerNight", {required: "this field is required "})}>
                        </input>
                         {errors.pricePerNight && (
                            <span className="text-red-500">{errors.pricePerNight.message}</span>
                        )}
                    </label>


                    <label className=" text-gray-700 text-sm font-bold max-w-[50%]">
                    Star Rating
                    <select {...register("starRating", {
                        required: "this field is required ",
                    })}
                    className="border rounded w-full p-2 text-grat-700 font-normal"
                    >
                        <option value="" className="text-sm font-bold">
                            Select the Rate
                        </option>
                        {[1,2,3,4,5].map((num) => (
                            <option value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                         {errors.starRating && (
                            <span className="text-red-500">{errors.starRating.message}</span>
                        )}
                    </label>

        </div>
    )
}
export default DetailsSection