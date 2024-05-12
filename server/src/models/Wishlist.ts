import { Schema, model, models } from "mongoose";
import { Document, ObjectId } from "mongoose";

interface WishlistDocument extends Document {
  user: ObjectId;
  items: ObjectId[];
}

const WishlistSchema = new Schema<WishlistDocument>({
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
    },
  ],
});

const Wishlist = models.Wishlist || model("Wishlist", WishlistSchema);

export default Wishlist;
