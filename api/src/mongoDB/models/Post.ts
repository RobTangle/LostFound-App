import { Date, Schema } from "mongoose";
import { IUser, userSchema } from "./User";

export interface IPost {
  _id?: string;
  name_on_doc: string;
  number_on_doc: string;
  country_found: string;
  date_found: Date;
  blurred_imgs: string[];
  comments: string | undefined;
  user_posting: IUser;
}

// Para counties, guardar el array de countries en algún lado y enviarlo al front. Cómo hacer esto? en qué idioma se tiene que guardar???? Api externa para esto???

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
    country_found: { type: String, required: true, lowercase: true },
    date_found: { type: Date, required: true },
    blurred_imgs: [{ type: String, required: false }],
    comments: { type: String, maxlength: 800, required: false },
    user_posting: userSchema,
  },
  { timestamps: true }
);
