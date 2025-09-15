import { Product } from "../models/productModel";
import { Request, Response } from "express";


export const createProduct=async(req:Request,res:Response)=>{
    try{
        const {prodName,prodDesc,prodPrice,prodQty}=req.body;
        const newProduct=new Product({
            prodName,
            prodDesc,
            prodPrice,
            prodQty
        });
        const savedProduct=await newProduct.save();
        res.status(201).json({message:'Product created successfully',product:savedProduct});
    }
    catch(error){
        res.status(500).json({message:'Server Error',error});
    }
}
    