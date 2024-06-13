
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



const App = () => {
  const { isLogginedIn } = useAppContext();
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Layout>
          <p>Home page</p>
        </Layout>} />



        <Route path="/search" element={
          <Layout>
            <p>Search Page</p>
          </Layout>
        }/> 

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
          <Route path="/add-hotel" element={
            <Layout>
              <AddHotel/>
            </Layout>
          }
            />

          <Route path="/my-hotels" element={
            <Layout>
              <MyHotels/>
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
