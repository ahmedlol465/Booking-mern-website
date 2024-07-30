import React, { Children, useState } from "react"

type SearchContext = {
    destination: string
    checkIn: Date
    checkOut: Date
    adultCount: number
    childCount: number
    hotelId: string
    saveSearchValue: (
        destination: string,
        checkIn: Date,
        checkOut: Date,
        adultCount: number,
        childCount: number,
    ) => void
}

type SearchContextProviderProps = {
    children: React.ReactNode
}


const SearchContext = React.createContext<SearchContext | undefined>(undefined)



export const SearchContextProvider = ({children}: SearchContextProviderProps) => {

    const [destination, setDestination] = useState<string>("")
    const [checkIn, setCheckIn] = useState<Date>(new Date())
    const [checkOut, setCheckOut] = useState<Date>(new Date())
    const [adultCount, setAdultCount] = useState<number>(1)
    const [childCount, setChildCount] = useState<number>(0)
    const [hotelId, setHotelId] = useState<string>("")

    const saveSearchValue = (
        destination: string,
        checkIn: Date,
        checkOut: Date,
        adultCount: number,
        childCount: number,
        hotelId?: string
    ) => {
        setDestination(destination)
        setCheckIn(checkIn)
        setCheckOut(checkOut)
        setAdultCount(adultCount)
        setChildCount(childCount)
        if (hotelId) {
            setHotelId(hotelId)
        }
    }
    return (
        <SearchContext.Provider value={{
            destination,
            checkIn,
            checkOut,
            adultCount,
            childCount,
            hotelId: "",
            saveSearchValue
        }}>
            {children}
        </SearchContext.Provider>
    )
}


export const useSearchContext = () => {
    const context = React.useContext(SearchContext)
    if (context === undefined) {
        throw new Error("useSearchContext must be used within a SearchContextProvider")
    }
    return context
}