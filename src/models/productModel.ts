import { Schema,Document,model } from "mongoose";
interface IProduct extends Document{
    prodName:string;
    prodDesc:string;
    prodPrice:number;
    prodQty:number;
}



const productShema=new Schema<IProduct>({
    prodName:{type:String,required:true},
    prodDesc:{type:String,required:false},
    prodPrice:{type:Number,required:true},
    prodQty:{type:Number,required:true}
},
{
    timestamps:true
}
);

export const Product=model<IProduct>('Product',productShema);