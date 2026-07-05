import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true

}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:   // used for url encoded data
    "16kb"}))
app.use(static('public'))
app.use(cookieParser())  // used for parsing cookies in the request headers



export {app}