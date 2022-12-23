"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = void 0;
const mongoose_1 = require("mongoose");
const defaultModelsProps_1 = __importDefault(require("./defaultModelsProps"));
const postProps = defaultModelsProps_1.default.post;
exports.postSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
