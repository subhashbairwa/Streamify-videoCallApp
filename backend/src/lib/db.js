import mongoose from "mongoose"

export const connectDB= async ()=>{
    try {
        const conn= await mongoose.connect(process.env.MONGODB_URI);
        console.log(`mongoDB Connected: ${conn.connection.host}`);
        
    } catch (error) {
        console.log("Error in connecting mongodb",error);
        process.exist(1);
    }
} 