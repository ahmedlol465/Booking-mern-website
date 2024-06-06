import express, {Request, Response} from 'express'
import cors from 'cors'
import "dotenv/config"
import mongoose from 'mongoose'
import userRoutes from "./routes/user"
import authRoutes from "./routes/auth"
import cookieParser from 'cookie-parser'
import path from "path";
import { v2 as cloudinary } from 'cloudinary'
import hotelRoutes from "./routes/my-hotels"


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
app.use("/api/my-hotels", hotelRoutes)



app.listen(3002, () => {
    console.log("server is running...");
    
})