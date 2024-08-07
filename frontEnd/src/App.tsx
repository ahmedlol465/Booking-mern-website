import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import { useAppContext } from "./context/AppContext";
import AddHotel from "./pages/AddHotel";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";
import Details from "./pages/Details";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Home from "./pages/Home";


const App = () => {
  const { isLogginedIn } = useAppContext();
  return(
    <Router>
      <Routes>
        
        <Route path="/" element={<Layout>
          <Home/>
        </Layout>} />



        <Route path="/search" element={
          <Layout>
            <Search/>
          </Layout>
        } /> 
        

        <Route path="/detail/:hotelId" element={
          <Layout>
            <Details/>
          </Layout>
        } /> 
        

        <Route path="/register" element = {
          <Layout>
            <Register/>
          </Layout>
        }/>

        <Route path="/sign-in" element={
          <Layout>
            <SignIn/>
          </Layout>
        }/>

        {isLogginedIn && (<>
          <Route path="/hotel/:hotelId/booking" element={
            <Layout>
              <Booking/>
            </Layout>
          }
          />

          <Route path="/add-hotel" element={
            <Layout>
              <AddHotel/>
            </Layout>
          }
          />
          
          <Route path="/Edit-hotel/:hotelId" element={
            <Layout>
              <EditHotel/>
            </Layout>
          }
            />

          <Route path="/my-hotels" element={
            <Layout>
              <MyHotels/>
            </Layout>
          }
            />

            
          <Route path="/my-bookings" element={
            <Layout>
              <MyBookings/>
            </Layout>
          }
            />


        </>)}

        <Route path="/*" element={<Navigate to="/" />} /> 

    
      </Routes>
    </Router>
  )
}

export default App
