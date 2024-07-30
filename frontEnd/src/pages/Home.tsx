import { useQuery } from "react-query"
import * as apiClient from "../api-clients"
import LatestDestination from "../components/LatestDestination"



const Home = () => {
    const { data: hotels } = useQuery("fetchHotels", apiClient.fetchHotels)

    const topRowHotels = hotels?.slice(0, 2) || []

    const bottomRowHotels = hotels?.slice(2) || []


    return (
        <div className="space-y-6 px-4 md:px-8 lg:px-16">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold mb-2">Latest Destinations</h2>
          <p className="text-lg text-gray-600">Explore the most recent destinations added by our hosts.</p>
        </div>
        
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-2">
          {topRowHotels.map((hotel) => (
            <LatestDestination key={hotel._id} hotel={hotel} />
          ))}
        </div>
      
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {bottomRowHotels.map((hotel) => (
            <LatestDestination key={hotel._id} hotel={hotel} />
          ))}
        </div>
      </div>
      
    )
    
}


export default Home