import { IAuthVerificationType } from "@/types";
import { compare, genSalt, hash } from "bcrypt";
import { Schema, model } from "mongoose";

interface Methods {
  compareToken(token: string): Promise<boolean>;
}

const TokenSchema = new Schema<IAuthVerificationType, {}, Methods>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 86400, // 60 * 60 * 24
    default: Date.now(),
  },
});

TokenSchema.pre("save", async function (next) {
  if (this.isModified("token")) {
    const salt = await genSalt(10);
    this.token = await hash(this.token, salt);
  }

  next();
});

TokenSchema.methods.compareToken = async function (token) {
  return await compare(token, this.token);
};

const AuthVerificationTokenModel = model("AuthVerificationToken", TokenSchema);
export default AuthVerificationTokenModel;
