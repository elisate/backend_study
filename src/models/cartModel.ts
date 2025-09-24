import { Schema, Document, model, Types } from "mongoose";

interface ICartItem {
  product: Types.ObjectId;  // Reference to Product
  quantity: number;
}

interface ICart extends Document {
  userId: Types.ObjectId;   // Reference to User
  items: ICartItem[];
}

const cartSchema = new Schema<ICart>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Cart = model<ICart>("Cart", cartSchema);
