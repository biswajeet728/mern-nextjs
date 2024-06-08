import { IAddress } from "@/types";
import { Schema, model } from "mongoose";

const AddressSchema = new Schema<IAddress, {}, {}>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      zipCode: { type: Number, required: true },
      phone: { type: Number, required: true },
      landmark: { type: String, required: false },
      isDefault: { type: Boolean, default: false },
    },
  ],
});

const Address = model("Address", AddressSchema);
export default Address;
