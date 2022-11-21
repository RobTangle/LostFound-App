"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoDB_1 = require("../../mongoDB");
const post_validators_1 = require("../../validators/post-validators");
const router = (0, express_1.Router)();
router.get("/allPosts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allPostsFromDB = yield mongoDB_1.Post.find();
        return res.status(200).send(allPostsFromDB);
    }
    catch (error) {
        console.log(`Error en ruta /allPosts. ${error.message}`);
    }
}));
router.post("/newPost", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("REQ.BODY = ", req.body);
        let userPostingId = "00000001primerUserID";
        const userInDB = yield mongoDB_1.User.findById(userPostingId);
        console.log("User In DB = ", userInDB);
        const newPostToValidate = Object.assign(Object.assign({}, req.body), { user_posting: userInDB });
        const validatedPost = (0, post_validators_1.validatePost)(newPostToValidate);
        const newPost = yield mongoDB_1.Post.create(validatedPost);
        if (!newPost) {
            throw new Error("Lo siendo. Hubo un error y no se creó el aviso.");
        }
        return res.status(200).send(newPost);
    }
    catch (error) {
        console.log(`Error en POST '/newPost. ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
}));
exports.default = router;
