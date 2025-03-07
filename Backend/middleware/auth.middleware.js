import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import User from "../models/user.model.js";

dotenv.config();

export const protectRoute = async (req,res,next)=>{
    try {
        const accessToken = req.cookies.accessToken;
        if(!accessToken){
            return res.status(401).json({message:"No access token provided"})
        }

        const decoded = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decoded.userId).select("-password")
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware",error.message);
        res.status(500).json({message:"Internal server error"})
    }
}

export const adminRoute = (req,res,next)=>{
    if(req.user && req.user.role==="admin"){
        next();
    }else{
        return res.status(403).json({message:"Access denied - Admin only"})
    }
}