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
exports.handlePaginatedPostResultsRequest = void 0;
const genericValidators_1 = require("../../validators/genericValidators");
const post_validators_1 = require("../../validators/post-validators");
const mongoDB_1 = require("../../mongoDB");
// Hacer función que recibe como argumentos (model, filter, options).
// filter: sería lo que paso en la ruta que hago un search por query.
// options:  sería el :  sortby, limit, page
//  retorno un objeto queryResult.
function handlePaginatedPostResultsRequest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { pag, lim } = req.query;
            console.log(req.query);
            let page = 1;
            let limit = 5;
            if (typeof pag === "string") {
                page = parseInt(pag) || 1;
            }
            if (typeof lim === "string") {
                limit = parseInt(lim) || 5;
            }
            let startIndex = (page - 1) * limit || 0;
            if (startIndex < 0) {
                startIndex = 0;
            }
            //! query / filter:
            const queryParsedValues = parseReqQuery(req.query);
            // Parseo de inputs:
            let nameOnDocParsed = (0, post_validators_1.checkAndParseNameOnDoc)(queryParsedValues.name);
            let countryParsed = queryParsedValues.country.toLowerCase();
            let numberOnDocParsed = (0, post_validators_1.checkAndParseNumberOnDoc)(queryParsedValues.number);
            let verifiedDate = (0, genericValidators_1.checkAndParseDate)(queryParsedValues.date_lost);
            const filterObj = {
                $and: [
                    {
                        $or: [
                            { name_on_doc: { $eq: nameOnDocParsed } },
                            { number_on_doc: { $eq: numberOnDocParsed } },
                        ],
                    },
                    { country_found: { $eq: countryParsed } },
                    { date_found: { $gte: verifiedDate } },
                ],
            };
            const projectionObj = {
                "user_posting.posts": 0,
                "user_posting.createdAt": 0,
                "user_posting.updatedAt": 0,
                "user_posting.additional_contact_info": 0,
            };
            const allTheDocs = {};
            const countTotal = yield mongoDB_1.Post.find(filterObj).countDocuments().exec();
            const docsFound = yield mongoDB_1.Post.find(filterObj, projectionObj)
                .skip(startIndex)
                .limit(limit)
                .lean()
                .exec();
            //! ---------------
            const results = {
                results: docsFound,
                page,
                limit,
                totalPages: Math.ceil(countTotal / limit),
                totalResults: countTotal,
            };
            return res.status(200).send(results);
        }
        catch (error) {
            console.log(`Error en paginado. ${error.message}`);
            return res.status(400).send({ error: "Something went wrong :( " });
        }
    });
}
exports.handlePaginatedPostResultsRequest = handlePaginatedPostResultsRequest;
// PARSE REQ QUERY TYPEOF VALUES :
function parseReqQuery(reqQuery) {
    let { name, number, country, date_lost } = reqQuery;
    if (typeof name !== "string" ||
        typeof country !== "string" ||
        typeof date_lost !== "string") {
        console.log("Algún valor por query no es string.");
        throw new Error("Invalid query inputs");
    }
    if (typeof number === "string" && number.length) {
        const queryParsed = {
            name,
            number,
            country,
            date_lost,
        };
        return queryParsed;
    }
    else {
        const queryParsed = {
            name,
            number: Math.random() + "",
            country,
            date_lost,
        };
        return queryParsed;
    }
}
