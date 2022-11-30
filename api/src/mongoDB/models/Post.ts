import { Date, Schema } from "mongoose";

export interface IPost {
  _id?: string;
  name_on_doc: string;
  number_on_doc: string;
  country_found: string;
  date_found: Date;
  blurred_imgs: string[];
  comments: string | undefined;
  user_posting: IUserPosting;
}

export interface IUserPosting {
  _id: string;
  name: string;
  email: string;
  profile_img?: string;
  additional_contact_info?: string;
}

export const postSchema: Schema = new Schema<IPost>(
  {
    name_on_doc: {
      type: String,
      maxlength: 100,
      required: true,
      lowercase: true,
    },
    number_on_doc: {
      type: String,
      maxlength: 100,
      required: true,
      lowercase: true,
    },
    country_found: { type: String, required: true, uppercase: true },
    date_found: { type: Date, required: true },
    blurred_imgs: [{ type: String, required: false }],
    comments: { type: String, maxlength: 800, required: false },
    user_posting: {
      _id: { type: String, required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
      profile_img: { type: String, required: false },
      additional_contact_info: {
        type: String,
        required: false,
        maxlength: 150,
      },
    },
  },
  { timestamps: true }
);
