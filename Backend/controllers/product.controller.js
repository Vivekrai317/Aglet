import Product from "../models/product.model.js"

export const getAllProducts=async (req,res)=>{
    try {
        const products = await Product.find({}); //get all 
        res.json({products})
    } catch (error) {
        console.log("Error in getAllProducts controller",error.message);
        res.status(500).json({error:error.message})
    }
}