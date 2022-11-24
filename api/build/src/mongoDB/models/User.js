"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const Subscription_1 = require("./Subscription");
exports.userSchema = new mongoose_1.Schema({
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
        default: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png",
    },
    posts: [{ type: String, ref: "Post" }],
    subscriptions: [Subscription_1.subscriptionSchema],
}, { timestamps: true });
// Pensar sistema de alertas y forma de guardar las suscripciones de las alertas.
// -La alerta es un objeto que representa una query?
// - Una vez que se crea un posteo, voy con los datos del nuevo posteo a buscar matches por la collection de alertas?
// Qué sistema es más eficiente? Pensar cantidades de alertas y cantidades de posteos nuevos y sus relaciones en queries en una dirección u otra.
