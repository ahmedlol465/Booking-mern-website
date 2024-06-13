import express, {Request, Response} from "express"
import multer from 'multer'
import cloudinary from "cloudinary"
import Hotel from "../modules/hotel";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
import { HotelType } from "../shared/types";


const router = express.Router()

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits:{
        fieldSize: 5 * 1024 * 1024 // 5 MB
    }
})


// api/my-hotels
router.post("/", verifyToken, 
[
    body("name").notEmpty().withMessage("name is Required"),
    body("city").notEmpty().withMessage("city is Required"),
    body("country").notEmpty().withMessage("country is Required"),
    body("description").notEmpty().withMessage("description is Required"),
    body("type").notEmpty().withMessage("type is Required"),
    body("procePerNight").notEmpty().withMessage("PricePerNight is Required"),
    body("facilities").notEmpty().isArray().withMessage("facilities is Required"),
]
,upload.array("imageFiles", 6) , async(req: Request, res:Response) => {
try{
    const imageFiles = req.files as Express.Multer.File[]
    const newHotel: HotelType = req.body;

    const uploadPromises = imageFiles.map( async(image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataUrl = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataUrl);

        return res.url
})


const imageUrl = await Promise.all(uploadPromises)
newHotel.imageUrls =  imageUrl
newHotel.lastUpdated = new Date()
newHotel.userId = req.userId


const hotel = new Hotel(newHotel);
await hotel.save()


res.status(201).send(hotel);


}catch(error){
    console.log("Error Creating hotel: ", error);
    res.status(500).json({message: "Something went Wrong"})
}
})



router.get("/", verifyToken, async(req: Request, res: Response) => {
   try{
        const hotels = await Hotel.find({userId: req.userId});
        res.send(hotels)
   } catch(error) {
        res.status(500).json({message: "error fetch hotel"})
   }
}) 


export default router;