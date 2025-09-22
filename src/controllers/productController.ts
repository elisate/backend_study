import { Product } from "../models/productModel";
import { Request, Response } from "express";
import cloudinary from "../utils/cloudinaryConfig";
export const createProduct = async (req: Request, res: Response) => {
    try {
        const { prodName, prodDesc, prodPrice, prodQty } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "No image uploaded" });
        }
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "products", 
        });
        const imageUrl=result.secure_url
        const newProduct = new Product({
            prodName,
            prodDesc,
            prodPrice,
            prodQty,
            image:imageUrl
        });
        const savedProduct = await newProduct.save();
        res.status(201).json({ message: 'Product created successfully', product: savedProduct });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
}

export const getAllProducts = async (req: Request, res: Response) => {

    try {
        const products = await Product.find();
        res.status(200).json({ message: 'Products fetched successfully', products });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
}