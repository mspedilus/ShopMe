import express from "express"
import User from "../models/User.js";
import bcrypt from "bcryptjs"
import { createError } from "../index.js";
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

        await newUser.save()
        res.status(201).send("User has been created")

    } catch(err) {
        next(err)
    }

})

//Login user by verifying email and password is in MongoDB
router.post("/login", async (req, res, next) => {

    try {
        const user = await User.findOne({ email: req.body.email })
        if(!user) return next(createError(404, "User not found"))

        //Decrypts password and checks if email and password matches a user in MongoDB
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password) 
        console.log(isPasswordCorrect)
        if(!isPasswordCorrect) return next(createError(400, "Wrong password or username!"));

        const {password, ...otherDetails} = user._doc
        res.status(200).json(otherDetails)

    } catch(err) {
        next(err)
    }


})

export default router