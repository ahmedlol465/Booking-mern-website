import { RegisterForm } from "./pages/Register"
import { SignInFormData } from "./pages/SignIn";
import { HotelSearchResponse, HotelType, PaymentIntentResponse, UserType } from "../../backEnd/src/shared/types";
import { BookingFormData } from "./forms/BookingForm/BookingForm";


const API_BASE_URL = import.meta.env.VITE_API_BASE_UEL || "";



export const fetchCurrentUser = async (): Promise<UserType> => { 
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
        credentials: "include"
    });

    if(!response.ok) {
        throw new Error("Error in fetching user")
    }
    return response.json()

}




export const register = async (formData: RegisterForm) => {
    const response = await fetch(`${API_BASE_URL}/api/users/signUp`, {
        method: "POST",
        credentials: "include",
        headers: {  
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })

    const responseBody = await response.json();

    if(!response.ok) {
        throw new Error(responseBody.message)
    }

    // return where 
}

export const signIn = async(formData: SignInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logIn`, {
        method: "POST",
        credentials: "include", // to return the cookie
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })

    const body = await response.json()
    if(!response.ok) {
        throw new Error(body.message);
    }
    return body;
}




export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: "include"
    })
    if(!response.ok) {
        throw new Error("Token is invalid")
    }
    return response.json()
}


export const signOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials: "include",
        method: "POST"
    })
    if(!response.ok) {
        throw new Error("Error in sign out")
    }
}






export const addMyHotel = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        method: "POST",
        credentials: "include",
        body: hotelFormData
    })
    if(!response.ok) {
        throw new Error("Error in adding hotel")
    }

    return response.json()
}


export const fetchMyHotels = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        credentials: "include",

    })

    if(!response.ok) {
        throw new Error("Error in fetching hotels")
    }
    return response.json()

}


export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
        credentials: "include"
    })
    if(!response.ok) throw new Error ("Error fetchcing data")

    return response.json()
}


export const updatedMyHotelById = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`, {
        method: "PUT",
        body: hotelFormData,
        credentials: "include"
    })
    if(!response.ok) {
        throw new Error("Error in fetching hotels")
    }
    return response.json()
}




export type SearchPrams = {
    destination?: string
    checkIn?: string
    checkOut?: string
    adultCount?: string
    childCount?: string  
    page?: string
    facilities?: string[]
    types?: string[]
    stars?: string[]
    maxPrice?: string
    // minPrice?: string
    sortOption?: string
}


export const searchHotels = async (searchParams: SearchPrams): Promise<HotelSearchResponse> => {

    const quertParams = new URLSearchParams()
    // send in params
    quertParams.append("destination", searchParams.destination  ||  "")

    quertParams.append("checkIn", searchParams.checkIn || "")
    quertParams.append("checkOut", searchParams.checkOut || "")
    quertParams.append("adultCount", searchParams.adultCount || "")
    quertParams.append("childCount", searchParams.childCount || "")
    quertParams.append("page", searchParams.page || "")
    
    quertParams.append("maxPrice", searchParams.maxPrice || "")
    // quertParams.append("stars", searchParams.stars || "")
    quertParams.append("sortOption", searchParams.sortOption || "")
    



    searchParams.facilities?.forEach((facility) => quertParams.append("facility", facility))

    searchParams.types?.forEach((type) => quertParams.append("type", type))

    searchParams.stars?.forEach((star) => quertParams.append("stars", star))

    
    const response = await fetch(`${API_BASE_URL}/api/hotels/search?${quertParams}`)

    

    if(!response.ok) {
        throw new Error("Error in fetching hotels")
    }

    return response.json() 

}





export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`)

    if (!response.ok) {
        throw new Error("Error in fetching hotel")
    }

    return response.json()

}


    
export const createPaymenyIntent = async(hotelId: string, numberOfNights: string): Promise<PaymentIntentResponse> => {
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`, {
            credentials: "include",
            method: "POST",
            body: JSON.stringify({
                numberOfNights
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });


        if (!response.ok) {
            console.error("Error response status:", response.status, response.statusText);
            throw new Error("Error in creating payment intent");
        }

        return response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        throw error; // Re-throw the error after logging it
    }
}




export const createBooking = async(formData: BookingFormData) => {
    
    const response = await fetch(`${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(formData),
        credentials: "include",
    })
            

    if (!response.ok) {
        throw new Error("Error in creating booking")
    }


    }
    

    export const fetchHotels = async (): Promise<HotelType[]> => {
        const response = await fetch(`${API_BASE_URL}/api/hotels`)
        
        if(!response.ok) {
            throw new Error("Error in fetching booking")
        }
        return response.json()
    }


    export const fetchMyBooking = async (): Promise<HotelType[]> => {
        const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
            credentials: "include"
        })
        if(!response.ok) {
            throw new Error("Error in fetching booking")
        }
        return response.json()
    }