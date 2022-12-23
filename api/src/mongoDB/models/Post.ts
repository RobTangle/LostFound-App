import { Date, Schema } from "mongoose";
import modelsProps from "./defaultModelsProps";

const postProps = modelsProps.post;

export interface IPost {
  _id?: string;
  name_on_doc: string;
  number_on_doc?: string;
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
      minlength: postProps.name_on_doc.minlength,
      maxlength: postProps.name_on_doc.maxlength,
      required: true,
      lowercase: true,
      trim: true,
    },
    number_on_doc: {
      type: String,
      maxlength: postProps.number_on_doc.maxlength,
      required: false,
      lowercase: true,
      trim: true,
    },
    country_found: { type: String, required: true, lowercase: true },
    date_found: { type: Date, required: true },
    blurred_imgs: [{ type: String, required: false }],
    comments: {
      type: String,
      maxlength: postProps.comments.maxlength,
      required: false,
    },
    user_posting: {
      _id: { type: String, required: true },
      name: { type: String, required: true },
      email: { type: String, required: true, trim: true },
      profile_img: { type: String, required: false },
      additional_contact_info: {
        type: String,
        required: false,
        maxlength: postProps.additional_contact_info.maxlength,
        trim: true,
      },
    },
  },
  { timestamps: true }
);
