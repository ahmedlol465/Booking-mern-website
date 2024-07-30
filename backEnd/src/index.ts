import express, {Request, Response} from 'express'
import cors from 'cors'
import "dotenv/config"
import mongoose from 'mongoose'
import userRoutes from "./routes/user"
import authRoutes from "./routes/auth"
import cookieParser from 'cookie-parser'
import path from "path";
import { v2 as cloudinary } from 'cloudinary'
import myhotelRoutes from "./routes/my-hotels"
import hotelRoutes from "./routes/hotel"
import bookingRoutes from "./routes/my-booking"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME ,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRIT

})

mongoose.connect(process.env.MONGODB_CONNECTION as string)

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.use(express.static(path.join(__dirname, "../../frontEnd/dist")))

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/my-hotels", myhotelRoutes)

app.use("/api/hotels", hotelRoutes)
app.use("/api/my-bookings", bookingRoutes)



app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../frontEnd/dist/index.html"))
})



app.listen(3002, () => {
    console.log("server is running...");
    
})