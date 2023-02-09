import express from "express"
import User from "../models/User.js";
import bcrypt from "bcryptjs"
import { createError } from "../index.js";
import jwt from "jsonwebtoken";
const router = express.Router();

//Creates new user and stores user info in MongoDB
router.post("/register", async (req, res, next) => {

    //Encrypts password to store in MongoDb
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);

    try {
        const newUser = new User({
            email: req.body.email,
            password: hash,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNum: req.body.phoneNum,
        })

        const user = await newUser.save()

        //Creates and sends json web token
        const token = jwt.sign({id: user._id}, process.env.JWT)
        const {password, ...otherDetails} = user._doc
        res.cookie("access_token", token, { httpOnly: true }).status(201).json(otherDetails)

    } catch(err) {
        next(err)
    }

})

//Login user by verifying email and password is in MongoDB
router.post("/login", async (req, res, next) => {

    try {
        const user = await User.findOne({ email: req.body.email })
        if(!user) return next(createError(404, "User not found."))

        //Decrypts password and checks if email and password matches a user in MongoDB
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password) 
        if(!isPasswordCorrect) return next(createError(400, "Wrong password or username."));

        //Creates and sends json web token
        const token = jwt.sign({id: user._id}, process.env.JWT)
        const {password, ...otherDetails} = user._doc
        res.cookie("access_token", token, { httpOnly: true }).status(200).json(otherDetails)

    } catch(err) {
        next(err)
    }

})

//Checks if token is valid
export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    if(!token) return next(createError(401, "You are not authenticated."))
    
    jwt.verify(token, process.env.JWT, (err, user) => {
        if(err) return next(createError(403, "Token is not valid."))
        req.user = user
        next()
    })
    
}

//Checks if user is authenticated
export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id) next()
        else return next(createError(403, "You are not authorized."))
    })
}

export default router