import { useAppContext } from "../context/AppContext"
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm/ManageHotelForm"
import { useMutation } from "react-query"
import * as apiClient from "../api-clients"


const AddHotel = () => {
    const { showToast } = useAppContext() 
    const {mutate, isLoading} = useMutation(apiClient.addMyHotel, {
        onSuccess: () => {
            showToast({message: "Hotel added successfully", type: "SUCCESS"})
        },
        onError: () => {
            showToast({message: "Failed to add hotel", type: "ERROR"})
        }
    })

    const handleSave = (hotelFormData: FormData) => [
        mutate(hotelFormData)
    ]

    return (
        <ManageHotelForm onSave={handleSave} isLoading={isLoading}/> // disaple the buttom untel finish send
    )
}

export default AddHotel