"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const Post_1 = require("./Post");
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
    profile_img: {
        type: String,
        required: false,
        default: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png",
    },
    contacts: {
        type: [Number],
        required: false,
    },
    posts: [Post_1.postSchema],
    // Suscripciones de alertas. [{query}, {query}] MAX 5.
    subscriptions: [Subscription_1.subscriptionSchema],
}, { timestamps: true });
