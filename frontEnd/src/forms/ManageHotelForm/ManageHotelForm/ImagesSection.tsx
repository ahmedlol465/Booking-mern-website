import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";



const ImagesSection = () => {
    const {register, formState: {errors}} = useFormContext<HotelFormData>();

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Images</h2>
            <div className="border rounded p-4 flex-col gap-4">
            <input multiple accept="image/*" className="w-full text-gray-700 font-normal" type="file" {...register("imageFiles", {
                validate: (imageFiles) => {
                    const tatalLength = imageFiles.length;
                    if(tatalLength === 0) return ( "please select at least one image")
                    if(tatalLength > 6) return ("please select at most 6 images")

                }   
            })} />
            </div>
            {errors.imageFiles && (
                <span className="text-red-500">
                    {errors.imageFiles.message}
                </span>
            )} 
        </div>
    )


}


export default ImagesSection