// 1) Usuario L crea una suscripción para que cuando se realice un posteo que coincide con su suscripción, que le avisen.
// 2) Usuario F crea un aviso/post.
// 3) Acto seguido de crear el aviso y responder status.200, se recorre la collection de Suscriptions y se chequea si algúna suscripcion coincide con el nuevo posteo.

// En la ruta "newPost", luego de crear el nuevo posteo y res.status(200) (sin return!), invocar una función que realiza una query por la tabla de subscripciones, buscando como query el objeto newPost que se acaba de crear. Esta función va a enviar un email a todos los matches que encuentre.

import { Schema } from "mongoose";

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
