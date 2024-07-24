import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";



const ImagesSection = () => {
    const {
        register,
        formState: { errors },
        watch,
        setValue,
    } = useFormContext<HotelFormData>();

    const  existImageUrl = watch("imageUrls")

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement,MouseEvent>, imageUrl: string) => {
        event.preventDefault()
        setValue("imageUrls", existImageUrl.filter((url) => url !== imageUrl))
    }
    
    
    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Images</h2>
            <div className="border rounded p-4 flex-col gap-4">
                {existImageUrl && (
                    <div className="grid grid-cols-6 gap-4">
                        {existImageUrl.map((url) => (
                            <div className="relative group">
                                <img src={url} className="min-h-full object-cover"/>
                                <button
                                    onClick={(event) => handleDelete(event, url)}
                                    className="absolute top-0 left-0 bg-black bg-opacity-50  text-white text-sm font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 flex items-center justify-center">
                                    Delete
                                    </button>
                            </div>
                        ))}
                    </div>
                )}
            <input multiple accept="image/*" className="w-full text-gray-700 font-normal" type="file" {...register("imageFiles", {
                validate: (imageFiles) => {
                    const tatalLength = imageFiles.length + (existImageUrl?.length || 0);
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