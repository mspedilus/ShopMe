import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import productsRoute from "./routes/products.js"
import cookieParser from "cookie-parser"
import cors from "cors"


const app = express()
dotenv.config()
mongoose.set('strictQuery', false);

//Connects to MongoDB
const connect = () => {
    try{
        mongoose.connect(process.env.MONGO)
        console.log("Connected to Mongo")
    } catch(error) {
        throw error
    }

}

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected")
})

mongoose.connection.on("connected", () => {
    console.log("MongoDB connected!")
})

//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/products", productsRoute)

//Handles http request method errors
app.use((err, req, res, next) => {

    const errStatus = err.status || 500
    const errMessage = err.message || "An error occured"
    return res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMessage,
        stack: err.stack
    })
})

//Handles mongodb errors
export const createError = (status, message) => {
    const err = new Error()
    err.status = status
    err.message = message
    return err
};

//Starts express server
app.listen(8800, () => {
    connect()
    console.log("Connected to backend")
})
