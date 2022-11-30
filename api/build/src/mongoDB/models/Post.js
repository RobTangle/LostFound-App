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
        required: true,
        lowercase: true,
    },
    country_found: { type: String, required: true, uppercase: true },
    date_found: { type: Date, required: true },
    blurred_imgs: [{ type: String, required: false }],
    comments: { type: String, maxlength: 800, required: false },
    user_posting: {
        _id: String,
        name: String,
        email: String,
        profile_img: String,
    },
}, { timestamps: true });
