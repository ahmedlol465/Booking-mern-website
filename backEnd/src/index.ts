import express, {Request, Response} from 'express'
import cors from 'cors'
import "dotenv/config"
import mongoose from 'mongoose'
import userRoutes from "./routes/user"
import authRoutes from "./routes/auth"
import cookieParser from 'cookie-parser'
import path from "path";


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


app.listen(3002, () => {
    console.log("server is running...");
    
})