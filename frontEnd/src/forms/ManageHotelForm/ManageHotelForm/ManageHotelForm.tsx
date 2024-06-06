import { FormProvider, useForm } from "react-hook-form"
import DetailsSection from "./DetailsSection"
import TypeSection from "./TypeSection"
import Facilities from "./FacilitiesSection"
import GuestsSection from "./GuestsSection"
import ImagesSection from "./ImagesSection"

export type HotelFormData = {
    name: string
    city: string
    country: string
    descripton: string
    type: string
    adultCount: number
    childCount: number
    facilities: string[]
    pricePerNight: number
    starRating: number
    imageFiles: FileList
}

type Props = {
    onSave: (HotelFormData: FormData) => void
    isLoading: boolean
}

const ManageHotelForm = ({onSave, isLoading}: Props) => {
    const formMethod = useForm<HotelFormData>();

    const { handleSubmit } = formMethod

    const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
        // create a form data object and send to backend
        const formData = new FormData();
        formData.append("name", formDataJson.name);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("descripton", formDataJson.descripton);
        formData.append("type", formDataJson.type);
        formData.append("adultCount", formDataJson.adultCount.toString());
        formData.append("childCount", formDataJson.childCount.toString());
        formData.append("pricePerNight", formDataJson.pricePerNight.toString());
        formData.append("starRating", formDataJson.starRating.toString());

        Array.from(formDataJson.imageFiles).forEach((imageFile) => [
            formData.append(`imageFiles`, imageFile)
        ])
        
        formDataJson.facilities.forEach((facility, index) => {
            formData.append(`facilities[${index}]`, facility)
        });


        onSave(formData)
    


    })




    return (
        <FormProvider {...formMethod}>
            <form className="flex flex-col gap-10" onSubmit={onSubmit}>
                <DetailsSection/>
                <TypeSection/>
                <Facilities/>
                <GuestsSection/>
                <ImagesSection/>
                <span className="flex justify-end">
                    <button
                    disabled={isLoading}
                    type="submit" className="bg-blue-500 text-white p-2 font-bold  hover:bg-blue-500 text-xl disabled:bg-gray-500"
                    >
                        {isLoading ? "Saving..." : "Save"}
                        </button>

                </span>
            </form>
        </FormProvider>
    )
}

export default ManageHotelForm