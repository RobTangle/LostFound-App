"use strict";
// 1) Usuario L crea una suscripción para que cuando se realice un posteo que coincide con su suscripción, que le avisen.
// 2) Usuario F crea un aviso/post.
// 3) Acto seguido de crear el aviso y responder status.200, se recorre la collection de Suscriptions y se chequea si algúna suscripcion coincide con el nuevo posteo.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionSchema = void 0;
// En la ruta "newPost", luego de crear el nuevo posteo y res.status(200) (sin return!), invocar una función que realiza una query por la tabla de subscripciones, buscando como query el objeto newPost que se acaba de crear. Esta función va a enviar un email a todos los matches que encuentre.
const mongoose_1 = require("mongoose");
const defaultModelsProps_1 = __importDefault(require("./defaultModelsProps"));
const subsProps = defaultModelsProps_1.default.subscription;
exports.subscriptionSchema = new mongoose_1.Schema({
    name_on_doc: {
        type: String,
        maxlength: subsProps.name_on_doc.maxlength,
        minlength: subsProps.name_on_doc.minlength,
        required: true,
        lowercase: true,
        trim: true,
    },
    number_on_doc: {
        type: String,
        maxlength: subsProps.number_on_doc.maxlength,
        required: false,
        lowercase: true,
        trim: true,
    },
    country_lost: { type: String, required: true, lowercase: true },
    date_lost: { type: Date, required: true },
    user_subscribed: { type: Object, required: true },
});
