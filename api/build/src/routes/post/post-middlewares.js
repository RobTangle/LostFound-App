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
exports.handleDeletePostRequest = exports.handleGetPostByIdRequest = exports.handleUpdateRequest = exports.handleSearchByQueryRequest = exports.handleNewPostRequest = exports.findAllPostsResponse = void 0;
const mongoDB_1 = require("../../mongoDB");
const post_validators_1 = require("../../validators/post-validators");
const nodemailer_1 = require("../subscription/nodemailer");
const user_auxiliaries_1 = require("../user/user-auxiliaries");
const post_r_auxiliary_1 = require("./post-r-auxiliary");
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
function handleNewPostRequest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("REQ.BODY = ", req.body);
            let userPostingId = req.body._id;
            const userInDB = yield (0, user_auxiliaries_1.getUserByIdOrThrowError)(userPostingId);
            console.log("User In DB = ", userInDB);
            const newPostToValidate = Object.assign(Object.assign({}, req.body), { user_posting: userInDB });
            const validatedPost = (0, post_validators_1.validatePost)(newPostToValidate);
            const newPost = yield mongoDB_1.Post.create(validatedPost);
            userInDB.posts.push(newPost._id);
            yield userInDB.save();
            res.status(200).send(newPost);
            // CHEQUEO DE SUBSCRIPTIONS CON EL NEW POST:
            let resultOfSendingAlerts = yield (0, nodemailer_1.handleAlertAfterNewPost)(newPost);
            console.log(resultOfSendingAlerts);
        }
        catch (error) {
            console.log(`Error en POST '/newPost. ${error.message}`);
            return res.status(400).send({ error: error.message });
        }
    });
}
exports.handleNewPostRequest = handleNewPostRequest;
// En el formulario del front, que hagan un chequeo de que las letras del nombre sean [a-zA-z-0-9-áéíóúÁÉÍÓÚÜüçÇñÑ] y que no se equivoquen de tilde con la invertida. Tenemos que pedir que el nombre sea idéntico a como figura en el documento.
// Ya que descartamos la importancia de las tarjetas de crédito y le damos más importanci a pasaportes y DNI, el nombres siempre va a figurar completo. Y las tarjetas de crédito, la persona debería denunciarlas inmediatamente.
function handleSearchByQueryRequest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //jwtCheck // const user_id = req.auth?.sub;
            // await throwErrorIfUserIsNotRegisteredOrVoid(user_id)
            const postsFound = yield (0, post_r_auxiliary_1.searchPostsByQuery)(req.query);
            return res.status(200).send(postsFound);
        }
        catch (error) {
            console.log(`Error en GET "/". ${error.message}`);
            return res.status(400).send({ error: error.message });
        }
    });
}
exports.handleSearchByQueryRequest = handleSearchByQueryRequest;
function handleUpdateRequest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // jwtCheck // const user_id = req.auth?.sub
            const user_id = req.body.user_id;
            const post_id = req.params._id;
            const updatedDocument = yield (0, post_r_auxiliary_1.handleUpdatePost)(post_id, req.body, user_id);
            return res.status(200).send(updatedDocument);
        }
        catch (error) {
            console.log(`Error en ruta PUT "/post/:_id. ${error.message}`);
            return res.status(400).send({ error: error.message });
        }
    });
}
exports.handleUpdateRequest = handleUpdateRequest;
function handleGetPostByIdRequest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //jwtCheck // const user_id = req.auth?.sub;
            // await throwErrorIfUserIsNotRegisteredOrVoid(user_id)
            const post_id = req.params._id;
            const postFoundById = yield mongoDB_1.Post.findById(post_id).lean().exec();
            if (postFoundById === null) {
                return res
                    .status(404)
                    .send(`Post con id "${post_id}"  no encontrado en la base de datos.`);
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
function handleDeletePostRequest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //jwtCheck // const user_id = req.auth?.sub;
            const user_id = req.body.user_id; // temporal hasta jwtCheck
            const post_id = req.params._id;
            const deleteResults = yield (0, post_r_auxiliary_1.findPostByIdAndDeleteIt)(post_id, user_id);
            return res.status(200).send(deleteResults);
        }
        catch (error) {
            console.log(`Error en ruta DELETE "post/:_id". ${error.message}`);
            return res.status(400).send({ error: error.message });
        }
    });
}
exports.handleDeletePostRequest = handleDeletePostRequest;
