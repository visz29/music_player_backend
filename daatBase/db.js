import mongoose from "mongoose";

const dbconnect = async () => {

    mongoose.connect(process.env.DB_URI).then(()=>{
        console.log("data base Connected");
        
    }).catch((err)=>{
        console.log("ERROR =>",err);
        
    })
}

export default dbconnect