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
exports.setFilterObj = exports.parseReqQuery = exports.addContactDateToUserContacting = exports.checkContactsDate = exports.findPostByIdAndDeleteIt = exports.handleUpdatePost = exports.searchPostsByQuery = void 0;
const mongoDB_1 = require("../../mongoDB");
const post_validators_1 = require("../../validators/post-validators");
const genericValidators_1 = require("../../validators/genericValidators");
// SEARCH POSTS BY QUERY (WITHOUT PAGINATION) :
function searchPostsByQuery(queryFromReq) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, number, country, date_lost } = queryFromReq;
            // Parseo de inputs:
            let nameOnDocParsed = (0, post_validators_1.checkAndParseNameOnDoc)(name);
            console.log(nameOnDocParsed);
            let countryParsed = country.toLowerCase();
            console.log(countryParsed);
            let numberOnDocParsed = (0, post_validators_1.checkAndParseNumberOnDoc)(number);
            console.log(numberOnDocParsed);
            // date_lost tiene que ser menor o igual que date_found para que matchee.
            // La parseo con DateTime para chequear si es una fecha válida y que salte un error si no lo es:
            let verifiedDate = (0, genericValidators_1.checkAndParseDate)(date_lost);
            console.log(verifiedDate);
            // mongoose automáticamente compara la fecha yyyy-MM-dd correctamente contra la ISO de la DB. Pero igualmente intento parsearla con Luxon para que chequee si es una fecha válida o no. Si no lo es, tirará error. Si lo es, aprovecho y la uso para la query, pero es lo mismo que usar la date yyyy-MM-dd que viene por query.
            const postsFound = yield mongoDB_1.Post.find({
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
            }, {
                _id: 1,
                "user_posting.posts": 0,
                "user_posting.createdAt": 0,
                "user_posting.updatedAt": 0,
                "user_posting.additional_contact_info": 0,
            })
                .lean()
                .exec();
            return postsFound;
        }
        catch (error) {
            console.log(`Error en fn aux search Posts By Query`);
            throw new Error(error.message);
        }
    });
}
exports.searchPostsByQuery = searchPostsByQuery;
// UPDATE A POST :
function handleUpdatePost(post_id, reqFromBody, user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!post_id || !user_id) {
            throw new Error(`El id de la publicación y el id del usuario deben ser válidos.`);
        }
        const validatedData = (0, post_validators_1.validateUpdatePostData)(reqFromBody);
        const postInDB = yield mongoDB_1.Post.findById(post_id).exec();
        const userInDB = yield mongoDB_1.User.findById(user_id).exec();
        if (postInDB === null) {
            throw new Error(`Post con id "${post_id}" no fue encontrado en la base de datos.`);
        }
        if (userInDB === null) {
            throw new Error(`Usuario con id "${user_id} no fue encontrado en la base de datos.`);
        }
        if (postInDB.user_posting._id !== userInDB._id) {
            throw new Error(`El id del post no pertenece al usuario que desea modificarlo.`);
        }
        let response = {
            userPost: 0,
            postCollection: 0,
            total: 0,
            msg: "",
            status: 200,
        };
        try {
            // editar en collection Post:
            postInDB.name_on_doc = validatedData.name_on_doc;
            postInDB.number_on_doc = validatedData.number_on_doc;
            postInDB.country_found = validatedData.country_found;
            postInDB.date_found = validatedData.date_found;
            postInDB.blurred_imgs = validatedData.blurred_imgs;
            postInDB.comments = validatedData.comments;
            postInDB.user_posting.additional_contact_info =
                validatedData.additional_contact_info;
            yield postInDB.save();
            response.postCollection++;
            response.total++;
            // editar en User.posts:
            let userPost = userInDB.posts.id(post_id);
            if (userPost) {
                userPost.name_on_doc = validatedData.name_on_doc;
                userPost.number_on_doc = validatedData.number_on_doc;
                userPost.country_found = validatedData.country_found;
                userPost.date_found = validatedData.date_found;
                userPost.blurred_imgs = validatedData.blurred_imgs;
                userPost.comments = validatedData.comments;
                userPost.user_posting.additional_contact_info =
                    validatedData.additional_contact_info;
                yield userInDB.save();
                response.userPost++;
                response.total++;
            }
        }
        catch (error) {
            response.msg = error.message;
            response.status = 400;
        }
        finally {
            return response;
        }
    });
}
exports.handleUpdatePost = handleUpdatePost;
// DELETE POST :
function findPostByIdAndDeleteIt(post_id, user_id) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (!post_id || !user_id) {
            throw new Error(`El id del Post y el id del usuario deben ser válidos.`);
        }
        //borrar post en el user_posts y en collection Post
        const userInDB = yield mongoDB_1.User.findById(user_id).exec();
        const postInDB = yield mongoDB_1.Post.findById(post_id).exec();
        if (userInDB === null) {
            throw new Error(`Usuario con id "${user_id}" no encontrado en la base de datos.`);
        }
        if (postInDB === null) {
            throw new Error(`Post con id "${post_id}" no encontrado en la base de datos.`);
        }
        if (postInDB.user_posting._id !== userInDB._id) {
            throw new Error(`El post que se quiere eliminar no pertenece al usuario con id "${user_id}"`);
        }
        let response = {
            userPosts: 0,
            postCollection: 0,
            total: 0,
            msg: "",
            status: 200,
        };
        try {
            // buscar y borrar post de User.posts:
            let userPostRemoved = yield ((_a = userInDB.posts.id(post_id)) === null || _a === void 0 ? void 0 : _a.remove());
            if (userPostRemoved) {
                console.log("chequeo si el post ya fue removido antes de hacer el await userInDB.save() = ", userInDB);
                yield userInDB.save();
                console.log("después del userInDB.save(), consologueo el userInDB = ", userInDB);
                response.userPosts++;
                response.total++;
            }
            // buscar y borrar documento en collection Post:
            const deletedPost = yield mongoDB_1.Post.findByIdAndDelete(post_id).exec();
            if (deletedPost) {
                response.postCollection++;
                response.total++;
            }
        }
        catch (error) {
            response.status = 400;
            response.msg = error.message;
        }
        finally {
            return response;
        }
    });
}
exports.findPostByIdAndDeleteIt = findPostByIdAndDeleteIt;
// CHECK CONTACTS DATE :
function checkContactsDate(user_contacting) {
    if (Array.isArray(user_contacting.contacts) &&
        user_contacting.contacts.length >= 5) {
        // check date of the oldest contact: Si tiene más de 24hs, le permito. Si el último tiene menos de 24hs, tiro error:
        let dateNow = Date.now();
        let oldestContact = user_contacting.contacts[0];
        let timeFromOldestContact = dateNow - oldestContact;
        if (timeFromOldestContact <= 86400000) {
            throw new Error(`Too many contacts in the last 24hs.`);
        }
    }
}
exports.checkContactsDate = checkContactsDate;
// ADD CONTACT "TIMESTAMP" TO USER CONTACTING :
function addContactDateToUserContacting(user_contacting) {
    return __awaiter(this, void 0, void 0, function* () {
        if (Array.isArray(user_contacting.contacts) &&
            user_contacting.contacts.length >= 5) {
            user_contacting.contacts.shift();
            user_contacting.contacts.push(Date.now());
            yield user_contacting.save();
            console.log("Contact shifteado y pusheado");
        }
        else {
            if (Array.isArray(user_contacting.contacts) &&
                user_contacting.contacts.length < 5) {
                user_contacting.contacts.push(Date.now());
                yield user_contacting.save();
                console.log("Contact pusheado");
            }
        }
    });
}
exports.addContactDateToUserContacting = addContactDateToUserContacting;
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
            number: undefined,
            country,
            date_lost,
        };
        return queryParsed;
    }
}
exports.parseReqQuery = parseReqQuery;
// Retorna un objeto para pasar como filtro, dependiendo de si el number es falso o no :
function setFilterObj(name, number, country, date) {
    // si el number es falsy :
    if (name && !number && country && date) {
        const filterObjWithoutNumber = {
            $and: [
                { name_on_doc: { $eq: name } },
                { country_found: { $eq: country } },
                { date_found: { $gte: date } },
            ],
        };
        return filterObjWithoutNumber;
    }
    // si ningún valor es falsy :
    if (name && number && country && date) {
        const filterObjWithNumber = {
            $and: [
                {
                    $or: [
                        { name_on_doc: { $eq: name } },
                        { number_on_doc: { $eq: number } },
                    ],
                },
                { country_found: { $eq: country } },
                { date_found: { $gte: date } },
            ],
        };
        return filterObjWithNumber;
    }
    throw new Error("Invalid inputs for filter");
}
exports.setFilterObj = setFilterObj;
const postServices = {
    searchPostsByQuery,
    handleUpdatePost,
    findPostByIdAndDeleteIt,
    checkContactsDate,
    addContactDateToUserContacting,
    parseReqQuery,
    setFilterObj,
};
exports.default = postServices;
