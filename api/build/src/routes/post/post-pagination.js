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
const user_auxiliaries_1 = require("../user/user-auxiliaries");
const pagination_aux_1 = require("./pagination-aux");
// HANDLE PAGINATED POST RESULTS REQUEST :
function handlePaginatedPostResultsRequest(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //chequeo si el usuario está registrado en la db, o tira error :
            (0, user_auxiliaries_1.throwErrorIfUserIsNotRegisteredOrVoid)((_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub);
            // setup inicial de paginado :
            let { pag, lim, sortBy } = req.query;
            let page = 1;
            let limit = 5;
            let sort = "desc";
            if (sortBy === "asc") {
                sort = sortBy;
            }
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
            // Parseo y validación de inputs :
            const queryParsedValues = (0, pagination_aux_1.parseReqQuery)(req.query);
            let nameOnDocParsed = (0, post_validators_1.checkAndParseNameOnDoc)(queryParsedValues.name);
            let numberOnDocParsed = (0, post_validators_1.checkAndParseNumberOnDoc)(queryParsedValues.number);
            let countryParsed = queryParsedValues.country.toLowerCase();
            let verifiedDate = (0, genericValidators_1.checkAndParseDate)(queryParsedValues.date_lost);
            // [filter, projection, sort]  query objs :
            const filterObj = (0, pagination_aux_1.setFilterObj)(nameOnDocParsed, numberOnDocParsed, countryParsed, verifiedDate);
            const projectionObj = {
                "user_posting.posts": 0,
                "user_posting.createdAt": 0,
                "user_posting.updatedAt": 0,
                "user_posting.additional_contact_info": 0,
            };
            const sortObj = {
                createdAt: sort,
            };
            // find in the db :
            const countTotal = yield mongoDB_1.Post.find(filterObj).countDocuments().exec();
            const docsFound = yield mongoDB_1.Post.find(filterObj, projectionObj)
                .sort(sortObj)
                .skip(startIndex)
                .limit(limit)
                .lean()
                .exec();
            // setup the response obj with the query results :
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
