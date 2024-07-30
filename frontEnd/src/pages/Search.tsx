import { useQuery } from "react-query"
import { useSearchContext } from "../context/SearchContext"
import* as apiClint from "../api-clients" 
import { useState } from "react"
import SearchResultCard from "../components/StartResultsCard"
import Pagination from "../components/Pagination"
import StarRatingFilter from "../components/Star.Rating.Filter"
import HotelTypesFilter from "../components/HotelTypes.Filter"
import FacilitiesFilter from "../components/Facilities.Filter"
import PriceFilter from "../components/PriceFilter"

const Search = () => {
    const search = useSearchContext()

    const[page, setPage] = useState<number>(1)
    const [selectedStars, setSelectedStars] = useState<string[]>([])
    const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([])
    const [selectedFacilities, setSelectedFacilites] = useState<string[]>([])
    const [selectedPrice, setSelectedPrice] = useState<number | undefined>()
    const [sortOption, setSortOption] = useState<string>("")

    const searchParams = {
        destination: search.destination,
        checkIn: search.checkIn.toISOString(),
        checkOut: search.checkOut.toISOString(),
        adultCount: search.adultCount.toString(),
        childCount: search.childCount.toString(),
        page: page.toString(),
        stars: selectedStars,
        types: selectedHotelTypes,
        facilities: selectedFacilities,
        maxPrice: selectedPrice?.toString(),
        sortOption
    }

    const { data: hotelData } = useQuery(["searchHotels", searchParams], () => {
        
        return apiClint.searchHotels(searchParams)

        
    })

    

    const handleStareChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const starRating = event.target.value


        setSelectedStars((prevStars) => 
            event.target.checked
            ? [...prevStars, starRating]
            : prevStars.filter((star) => star !== starRating)
        )
    }



    const handleHotelTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const hotelType = event.target.value


        setSelectedHotelTypes((prevHotelType) => 
            event.target.checked
            ? [...prevHotelType, hotelType]
            : prevHotelType.filter((hotelTypes) => hotelTypes !== hotelType)
        )
    }


    const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const facility = event.target.value

        setSelectedFacilites((prevFacilities) => 
            event.target.checked
            ? [...prevFacilities, facility]
            : prevFacilities.filter((facility) => facility !== facility)
        )
    }




    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
                <div className="space-y-5">
                    <h3 className="text-lg font-semibold border-b pb-2">Filter By</h3>
                    {/* Add your filter options here */}
                    <StarRatingFilter selectedStars={selectedStars} onChange={handleStareChange}/>

                    <HotelTypesFilter selectedHotelTypes={selectedHotelTypes} onChange={handleHotelTypeChange}/>

                    <FacilitiesFilter selectedFacilities={selectedFacilities} onChange={handleFacilityChange}/>

                    <PriceFilter selectedPrice={selectedPrice} onChange={(value?: number) => setSelectedPrice(value)}/>
                </div>
                
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">

                        {hotelData?.pagination.total} Hotels Found
                        {search.destination ? ` in ${search.destination}` : ""}
                    </span>
                    {/* Add your sort options here */}
                    <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="p-2 border border-md">
                        <option value="">Sort By</option>
                        <option value="starRating">Star Rating</option>
                        <option value="pricePerNightAsc">Price Per Night(low to high)</option>
                        <option value="pricePerNightDesc">Price Per Night(hight to low)</option>
                    </select>
                </div>
                {hotelData?.data.map((hotel, index) => (
                    <SearchResultCard  key={index} hotel={hotel} />
                ))}


            <Pagination page={hotelData?.pagination.page ||  1}  pages={hotelData?.pagination.pages || 1} onPageChange={(page) => setPage(page)}/>
            </div>
        </div>
    )

}


export default Search