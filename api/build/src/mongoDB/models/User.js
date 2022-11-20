"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true, maxlength: 50 },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        maxlength: 100,
    },
    profile_img: { type: String, required: false },
}, { timestamps: true });
