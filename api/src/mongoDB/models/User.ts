import { Schema, HydratedDocument } from "mongoose";

interface IUser {
  _id: string;
  name?: string;
  email: string;
  profile_img?: string;
}

export const userSchema: Schema = new Schema<IUser>(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true, maxlength: 50 },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      maxlength: 100,
    },
    profile_img: { type: String, required: false },
  },
  { timestamps: true }
);
