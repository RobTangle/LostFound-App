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
const mongoDB_1 = require("../mongoDB");
const router = (0, express_1.Router)();
router.get("/allUsers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let allUsersFromDB = yield mongoDB_1.User.find();
        return res.status(200).send(allUsersFromDB);
    }
    catch (error) {
        return res.status(400).send({ error: error.message });
    }
}));
exports.default = router;
