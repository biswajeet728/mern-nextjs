import { IUser } from "@/types";
import { compare, genSalt, hash } from "bcrypt";
import { Schema, model } from "mongoose";

interface Methods {
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser, {}, Methods>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  avatar: {
    type: Object,
    url: String,
    public_id: String,
  },
  tokens: [String],
  bio: {
    type: String,
    default: null,
  },
  isSocialLogin: {
    type: Boolean,
    default: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  googleId: {
    type: String,
    default: null,
  },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
  }

  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return await compare(password, this.password);
};

const AuthVerificationTokenModel = model("User", UserSchema);
export default AuthVerificationTokenModel;
