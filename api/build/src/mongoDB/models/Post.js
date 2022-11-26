"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = void 0;
const mongoose_1 = require("mongoose");
const User_1 = require("./User");
// Para counties, guardar el array de countries en algún lado y enviarlo al front. Cómo hacer esto? en qué idioma se tiene que guardar???? Api externa para esto???
exports.postSchema = new mongoose_1.Schema({
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
    user_posting: User_1.userSchema,
}, { timestamps: true });
