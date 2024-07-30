
export type HotelType = {
    _id: string;
    userId: string;
    name: string;
    city: string;
    country: string;
    descripton: string;
    type: string;
    adultCount: number;
    childCount: number;
    facilities: string[];
    pricePerNight: number;
    starRating: number;
    imageUrls: string[];
    lastUpdated: Date; 
    bookings:  BookingType[]
}







export type HotelSearchResponse = {
    data: HotelType[];
    pagination: {
        total: number;
        page: number;
        pages: number
    }
}



export type UserType = {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}


export type PaymentIntentResponse = {
    clientSecret: string
    paymentIntent: string
    totalCoast: number
}

export type BookingType = {
    _id: string
    userId: string
    firstName: string
    lastName: string
    email: string
    checkIn: Date
    checkOut: Date
    adultCount: number
    childCount: number
    totalCoast: number
}