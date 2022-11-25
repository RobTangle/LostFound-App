"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CountiesArrays_1 = require("../../miscellanea/CountiesArrays");
const router = (0, express_1.Router)();
// GET ARRAY OF COUNTRIES BY LANGUAGE :
router.get("/", (req, res) => {
    try {
        let lang = req.query.lang;
        if (lang === "en") {
            return res.status(200).send(CountiesArrays_1.arrayOfArraysKeyValuesEN);
        }
        if (lang === "es") {
            return res.status(200).send(CountiesArrays_1.arrayOfArraysKeyValuesES);
        }
    }
    catch (error) {
        console.log(`Error en "/countries". ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
});
exports.default = router;
