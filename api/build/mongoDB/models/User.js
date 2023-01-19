"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const Post_1 = require("./Post");
const Subscription_1 = require("./Subscription");
exports.userSchema = new mongoose_1.Schema({
    _id: { type: String, required: true },
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 6,
        trim: true,
        validate: {
            validator: (value) => {
                return validator_1.default.isEmail(value);
            },
            message: "The email entered doesn't have a valid email format.",
        },
    },
    profile_img: {
        type: String,
        required: false,
        default: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png",
        trim: true,
        validate: {
            validator: (value) => {
                return validator_1.default.isURL(value);
            },
            message: "The profile image must be a valid URL.",
        },
    },
    contacts: {
        type: [Number],
        required: false,
    },
    posts: [Post_1.postSchema],
    // Suscripciones de alertas. [{query}, {query}] MAX 5.
    subscriptions: [Subscription_1.subscriptionSchema],
}, { timestamps: true });
