import { Link } from "react-router-dom"
import { HotelType } from "../../../backEnd/src/shared/types"

type Props = {
    hotel: HotelType
}
const LatestDestination = ({hotel}: Props) => {
    return (
      <Link
      to={`/detail/${hotel._id}`}
      className="relative cursor-pointer overflow-hidden rounded-xl shadow-xl transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl"
    >
      <div className="h-[300px] relative group">
        <img
          src={hotel.imageUrls[0]}
          alt={hotel.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 ease-in-out"></div>
      </div>
      <div className="absolute bottom-10 p-6 bg-black bg-opacity-60 w-full rounded-b-xl text-center transition-transform duration-300 ease-in-out transform translate-y-12 group-hover:translate-y-0">
        <span className=" text-white text-lg md:text-2xl lg:text-3xl font-extrabold shadow-lg">{hotel.name}</span>
      </div>
    </Link>
    )
}

export default LatestDestination