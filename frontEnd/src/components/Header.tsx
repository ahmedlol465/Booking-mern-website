import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import SignOutButton from "./SignOutButton";


const Header = () => {
    const { isLogginedIn } = useAppContext()
    return (
        <div className="bg-blue-800 py-6">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to="/">MernHolidays.come</Link>
                </span>
                <span className="flex space-x-2">
                    {isLogginedIn ? (<>
                        <Link className="flex item-center text-white px-3 font-bold hover:bg-blue-600" to="/my-bookings">My Booking</Link>
                        <Link className="flex item-center text-white px-3 font-bold hover:bg-blue-600" to="/my-hotels">My Hotels</Link>
                        <SignOutButton/>
                    </> )
                    :   (<Link to="/sign-in" className="m-auto flex item-center bg-white text-blue-600 px-5 py-2 font-bold hover:bg-gray-100"
                             >
                           Sign In
                            </Link>
                    )
                    }

                </span>
            </div>
        </div>
    )
}

export default Header