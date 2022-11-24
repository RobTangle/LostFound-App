import { Schema, HydratedDocument } from "mongoose";
import { ISubscription, subscriptionSchema } from "./Subscription";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  profile_img?: string;
  posts: string[];
  subscriptions: [ISubscription] | [];
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
    // Suscripciones de alertas. [{query}, {query}] MAX 5.
    profile_img: {
      type: String,
      required: false,
      default:
        "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png",
    },
    posts: [{ type: String, ref: "Post" }],
    subscriptions: [subscriptionSchema],
  },
  { timestamps: true }
);

// Pensar sistema de alertas y forma de guardar las suscripciones de las alertas.
// -La alerta es un objeto que representa una query?
// - Una vez que se crea un posteo, voy con los datos del nuevo posteo a buscar matches por la collection de alertas?
// Qué sistema es más eficiente? Pensar cantidades de alertas y cantidades de posteos nuevos y sus relaciones en queries en una dirección u otra.
