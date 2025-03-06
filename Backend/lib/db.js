import mongoose from "mongoose";

export const connectDB=async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MONGODB connected : ${conn.connection.host}`);
        
    } catch (error) {
        console.log("Error connection to MONGODB",error);
        process.exit(1)
    }
}