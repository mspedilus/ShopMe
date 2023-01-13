import express from "express"
import User from "../models/User.js";

const router = express.Router();


//Creates a new user
router.post("/", async (req, res, next) => {
    const newUser = new User(req.body)
    try {
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    } catch (err) {
        next(err)
    }
})

//Updates user information
router.put("/:id", async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true})
        res.status(200).json(updatedUser)
    } catch (err) {
        next(err)
    }
})

//Deletes user
router.delete("/:id", async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")
    } catch (err) {
        next(err)
    }
})

export default router

