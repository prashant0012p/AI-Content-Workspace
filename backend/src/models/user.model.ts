import { Schema, model, type Document } from "mongoose";

export interface UserDocument extends Document {
  email: string;
  password: string;
  createdAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const User = model<UserDocument>("User", userSchema);
export default User;
