import { Schema, Types } from "mongoose";
import { IPost, postSchema } from "./Post";
import { ISubscription, subscriptionSchema } from "./Subscription";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  profile_img?: string;
  contacts?: number[];
  posts: Types.DocumentArray<IPost>;
  subscriptions: Types.DocumentArray<ISubscription>;
}

export interface INewUser {
  _id: string;
  name: string;
  email: string;
  profile_img?: string;
}

export const userSchema: Schema = new Schema<IUser>(
  {
    _id: { type: String, required: true },
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      minlength: 6,
      trim: true,
    },
    profile_img: {
      type: String,
      required: false,
      default:
        "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png",
      trim: true,
    },
    contacts: {
      type: [Number],
      required: false,
    },
    posts: [postSchema],
    // Suscripciones de alertas. [{query}, {query}] MAX 5.
    subscriptions: [subscriptionSchema],
  },
  { timestamps: true }
);
