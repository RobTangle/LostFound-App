// 1) Usuario L crea una suscripción para que cuando se realice un posteo que coincide con su suscripción, que le avisen.
// 2) Usuario F crea un aviso/post.
// 3) Acto seguido de crear el aviso, se recorre la collection de Suscriptions y se chequea si algúna suscripcion coincide con ek nuevo posteo: Usar next() ??
// Cómo armar la lógica

import { Schema } from "mongoose";
import { IUser, userSchema } from "./User";

// export interface ISubscriptionHidratada {
//   name_on_doc: {
//     type: String;
//     maxlength: 100;
//     required: true;
//     lowercase: true;
//   };
//   number_on_doc: {
//     type: String;
//     maxlength: 100;
//     required: false;
//     lowercase: true;
//   };
//   country_lost: { type: String; required: true; lowercase: true };
//   date_lost: { type: Date; required: true };
//   user_subscribing: IUser;
// }

export interface ISubscription {
  name_on_doc: string;
  number_on_doc: string;
  country_lost: string;
  date_lost: Date;
  user_subscribed: { _id: string; name: string; email: string };
}

export const subscriptionSchema: Schema = new Schema<ISubscription>({
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
  country_lost: { type: String, required: true, lowercase: true },
  date_lost: { type: Date, required: true },
  user_subscribed: { type: Object, required: true },
});
