import { createProduct,getAllProducts} from "../controllers/productController";
import express from "express";

import { checkAdmin } from "../middlewares/authenitacationFunction";
import { Auth } from "../middlewares/authenitacationFunction";
import upload from "../utils/multer";

const uploading=upload.single('image');


// import upload from "../utils/multer";

// const uploading=upload.single('image');
const productRouter = express();

productRouter.post('/create-product',uploading,createProduct);
productRouter.get('/get-all-products', getAllProducts);

export default productRouter;
