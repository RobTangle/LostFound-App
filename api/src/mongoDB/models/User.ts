import { Schema, HydratedDocument } from "mongoose";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  profile_img?: string;
  posts: string[];
}

export const userSchema: Schema = new Schema<IUser>(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true, minlength: 2, maxlength: 50 },
    email: {
      type: String,
      required: true,
      lowercase: true,
      minlength: 6,
    },
    profile_img: { type: String, required: false },
    posts: [{ type: String, ref: "Post" }],
  },
  { timestamps: true }
);
