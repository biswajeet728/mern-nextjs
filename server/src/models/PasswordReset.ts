import { compare, genSalt, hash } from "bcrypt";
import { Schema, model } from "mongoose";

interface PassResetTokenDocument extends Document {
  owner: Schema.Types.ObjectId;
  token: string;
  createdAt: Date;
}

interface Methods {
  compareToken(token: string): Promise<boolean>;
}

const PasswordResetSchema = new Schema<PassResetTokenDocument, {}, Methods>({
  owner: {
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
    expires: 3600, // 60 * 60
    default: Date.now(),
  },
});

PasswordResetSchema.pre("save", async function (next) {
  if (this.isModified("token")) {
    const salt = await genSalt(10);
    this.token = await hash(this.token, salt);
  }

  next();
});

PasswordResetSchema.methods.compareToken = async function (token) {
  return await compare(token, this.token);
};

PasswordResetSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });

const PasswordReset = model("PasswordReset", PasswordResetSchema);
export default PasswordReset;
