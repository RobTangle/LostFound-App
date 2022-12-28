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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePaginatedPostResultsRequest = exports.handleContactUserRequest = exports.handleDeletePostRequest = exports.handleGetPostByIdRequest = exports.handleUpdateRequest = exports.handleSearchByQueryRequest = exports.handleNewPostRequest = exports.findAllPostsResponse = void 0;
const mongoDB_1 = require("../../mongoDB");
const post_validators_1 = require("../../validators/post-validators");
const post_1 = require("../../services/post");
const genericValidators_1 = require("../../validators/genericValidators");
const user_1 = __importDefault(require("../../services/user"));
const post_2 = __importDefault(require("../../services/post"));
const nodemailer_1 = __importDefault(require("../../services/nodemailer/"));
function findAllPostsResponse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allPostsFromDB = yield mongoDB_1.Post.find().lean().exec();
            return res.status(200).send(allPostsFromDB);
        }
        catch (error) {
            console.log(`Error en ruta /allPosts. ${error.message}`);
        }
    });
}
exports.findAllPostsResponse = findAllPostsResponse;
// CREATE A NEW POST :
function handleNewPostRequest(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("REQ.BODY = ", req.body);
            let userPostingId = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub;
            const userInDB = yield user_1.default.getUserByIdOrThrowError(userPostingId);
            console.log("User In DB = ", userInDB);
            const newPostToValidate = Object.assign(Object.assign({}, req.body), { user_posting: userInDB });
            const validatedPost = (0, post_validators_1.validatePost)(newPostToValidate);
            const newPost = yield mongoDB_1.Post.create(validatedPost);
            userInDB.posts.push(newPost);
            yield userInDB.save();
            res.status(201).send(newPost);
            // CHEQUEO DE SUBSCRIPTIONS CON EL NEW POST:
            let resultOfSendingAlerts = yield nodemailer_1.default.alertUsersAfterNewPost(newPost);
            console.log(resultOfSendingAlerts);
        }
        catch (error) {
            console.log(`Error en POST '/newPost. ${error.message}`);
            return res.status(400).send({ error: error.message });
        }
    });
}
exports.handleNewPostRequest = handleNewPostRequest;
// SEARCH POSTS BY QUERY :
function handleSearchByQueryRequest(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("REQ.QUERY = ", req.query);
            const user_id = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub;
            yield user_1.default.throwErrorIfUserIsNotRegisteredOrVoid(user_id);
            const postsFound = yield post_2.default.searchPostsByQuery(req.query);
            console.log("postsFound.length = ", postsFound.length);
            return res.status(200).send(postsFound);
        }
        catch (error) {
            console.log(`Error en GET "/". ${error.message}`);
            return res.status(400).send({ error: error.message });
        }
    });
}
exports.handleSearchByQueryRequest = handleSearchByQueryRequest;
// UPDATE A POST :
function handleUpdateRequest(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user_id = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub;
            const post_id = req.params._id;
            if (!post_id || !user_id) {
                throw new Error(`El id de la publicación y el id del usuario deben ser válidos.`);
            }
            const updateResponse = yield post_2.default.handleUpdatePost(post_id, req.body, user_id);
            return res.status(updateResponse.status).send(updateResponse.userUpdated);
        }
        catch (error) {
            console.log(`Error en ruta PUT "/post/:_id. ${error.message}`);
            return res.status(400).send({ error: error.message });
        }
    });
}
exports.handleUpdateRequest = handleUpdateRequest;
// GET POST BY POST_ID IN PARAMS :
function handleGetPostByIdRequest(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user_id = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub;
            yield user_1.default.throwErrorIfUserIsNotRegisteredOrVoid(user_id);
            const post_id = req.params._id;
            const postFoundById = yield mongoDB_1.Post.findById(post_id, {
                "user_posting.additional_contact_info": 0,
            })
                .lean()
                .exec();
            if (postFoundById === null) {
                return res
                    .status(404)
                    .send("Post con id '" +
                    encodeURI(post_id) +
                    "' no encontrado en la base de datos.");
            }
            return res.status(200).send(postFoundById);
        }
        catch (error) {
            console.log(`Error en ruta GET "post/:_id. ${error.message}`);
            return res.status(400).send({ error: error.message });
        }
    });
}
exports.handleGetPostByIdRequest = handleGetPostByIdRequest;
// DELETE POST BY POST_ID IN PARAMS :
function handleDeletePostRequest(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user_id = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub;
            const post_id = req.params._id;
            if (!post_id || !user_id) {
                throw new Error(`El id de la publicación y el id del usuario deben ser válidos.`);
            }
            const deleteResults = yield post_2.default.findPostByIdAndDeleteIt(post_id, user_id);
            return res.status(deleteResults.status).send(deleteResults);
        }
        catch (error) {
            console.log(`Error en ruta DELETE "post/:_id". ${error.message}`);
            return res.status(400).send({ error: error.message });
        }
    });
}
exports.handleDeletePostRequest = handleDeletePostRequest;
// CONTACT USER :
function handleContactUserRequest(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user_id = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub;
            const post_id = req.params.post_id;
            const user_contacting = yield mongoDB_1.User.findById(user_id).exec();
            if (!user_contacting) {
                throw new Error("Usuario no encontrado en la base de datos.");
            }
            const userInDBPosting = yield mongoDB_1.Post.findById(post_id, {
                user_posting: 1,
                _id: 0,
            })
                .lean()
                .exec();
            if (!userInDBPosting) {
                throw new Error("No se han encontrado los datos del creador del aviso.");
            }
            const user_posting = userInDBPosting.user_posting;
            // Chequear si excedió los 5 contactos en las últimas 24hs. throw Error || void :
            post_2.default.checkContactsDate(user_contacting);
            yield nodemailer_1.default.sendContactInfoEmailToBothUsers(user_posting, user_contacting);
            res.status(202).send({ msg: "Processing request. Check your email." });
            // add new contact to user_contacting_contacts:
            post_2.default.addContactDateToUserContacting(user_contacting).then(function (succ) {
                console.log("addContactDateToUserContacting: OK");
            }, function (error) {
                console.log("addContactDateToUserContacting: ERROR = ", error);
            });
        }
        catch (error) {
            console.log(`Error en ruta POST "contact/:_id". ${error.message}`);
            return res.status(400).send({ error: error.message });
        }
    });
}
exports.handleContactUserRequest = handleContactUserRequest;
// HANDLE PAGINATED POST RESULTS REQUEST :
function handlePaginatedPostResultsRequest(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //chequeo si el usuario está registrado en la db, o tira error :
            user_1.default.throwErrorIfUserIsNotRegisteredOrVoid((_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub);
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
            const queryParsedValues = (0, post_1.parseReqQuery)(req.query);
            let nameOnDocParsed = (0, post_validators_1.checkAndParseNameOnDoc)(queryParsedValues.name);
            let numberOnDocParsed = (0, post_validators_1.checkAndParseNumberOnDoc)(queryParsedValues.number);
            let countryParsed = queryParsedValues.country.toLowerCase();
            let verifiedDate = (0, genericValidators_1.checkAndParseDate)(queryParsedValues.date_lost);
            // [filter, projection, sort]  query objs :
            const filterObj = (0, post_1.setFilterObj)(nameOnDocParsed, numberOnDocParsed, countryParsed, verifiedDate);
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
const postControllers = {
    findAllPostsResponse,
    handleNewPostRequest,
    handleSearchByQueryRequest,
    handleUpdateRequest,
    handleGetPostByIdRequest,
    handleDeletePostRequest,
    handleContactUserRequest,
    handlePaginatedPostResultsRequest,
};
exports.default = postControllers;
