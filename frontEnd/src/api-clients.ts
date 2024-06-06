import { RegisterForm } from "./pages/Register"
import { SignInFormData } from "./pages/SignIn";


const API_BASE_URL = import.meta.env.VITE_API_BASE_UEL || "";
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
