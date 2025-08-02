import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    profilePic:{
        type:String,
        default:"https://plus.unsplash.com/premium_vector-1720740375507-2c946054580f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"   
    },
    bio:{
        type:String,
        default:"Hey there! I am using MyMusic Player"
    },
},{
    timestamps:true
})

userSchema.methods.tokenGenerator = async function () {
    return await jwt.sign({ username: this.username }, `${Math.floor(1000000000 + Math.random() * 9000000000)}`)
}

const User = mongoose.model("User",userSchema)
export default User