import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNum: {
        type: String,
    }
}, { timestamps: true })

export default model("User", UserSchema)