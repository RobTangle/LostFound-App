"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = void 0;
const mongoose_1 = require("mongoose");
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
        required: false,
        lowercase: true,
    },
    country_found: { type: String, required: true, lowercase: true },
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
}, { timestamps: true });
