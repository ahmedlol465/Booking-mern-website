import { useFormContext } from "react-hook-form"
import { hotelFacilities } from "../../../config/hotel-option-config"
import { HotelFormData } from "./ManageHotelForm";

const Facilities = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();
return (
    <div>
        <h2 className="text-2xl font-bold mb-3">Facilites</h2>
        <div className="grid grid-cols-5 gap-3">
            {hotelFacilities.map((facility) => (
                <label className="text-gray-700 text-sm flex gap-1">
                    <input type="checkbox" value={facility} 
                    {...register("facilities", {
                        validate: (facility) => {
                            if(facility && facility.length > 0) {
                                return true
                            }else {
                                return "choose at least one facilites"
                            }
                        
                        }
                    })}
                    />
                    {facility}
                </label>
            ))}
        </div>
        {errors.facilities && (
            <span className="text-red-500 text-sm font-bold">{errors.facilities.message}</span>
        )}
    </div>
)
}

export default Facilities