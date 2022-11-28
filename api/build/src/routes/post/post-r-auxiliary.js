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
exports.findPostByIdAndDeleteIt = exports.handleUpdatePost = exports.findMatchingSuscriptions = exports.searchPostsByQuery = void 0;
const mongoDB_1 = require("../../mongoDB");
const post_validators_1 = require("../../validators/post-validators");
const genericValidators_1 = require("../../validators/genericValidators");
function searchPostsByQuery(queryFromReq) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, number, country, date_lost } = queryFromReq;
            // parseo el número del documento para sacarle los símbolos:
            let numberOnDocParsed;
            if (typeof number === "string") {
                numberOnDocParsed = number.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
            }
            // date_lost tiene que ser menor o igual que date_found para que matchee.
            // La parseo con DateTime para chequear si es una fecha válida y que salte un error si no lo es:
            let verifiedDate = (0, genericValidators_1.checkAndParseDate)(date_lost);
            // mongoose automáticamente compara la fecha yyyy-MM-dd correctamente contra la ISO de la DB. Pero igualmente intento parsearla con Luxon para que chequee si es una fecha válida o no. Si no lo es, tirará error. Si lo es, aprovecho y la uso para la query, pero es lo mismo que usar la date yyyy-MM-dd que viene por query.
            // El name se compara automáticamente con un "iLike". No hace falta pasarla a minúscula.
            const postsFound = yield mongoDB_1.Post.find({
                $and: [
                    {
                        $or: [{ name_on_doc: name }, { number_on_doc: numberOnDocParsed }],
                    },
                    { country_found: country },
                    { date_found: { $gte: verifiedDate } },
                ],
            }, {
                _id: 1,
                "user_posting.posts": 0,
                "user_posting.createdAt": 0,
                "user_posting.updatedAt": 0,
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
function findMatchingSuscriptions(newPost) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name_on_doc, number_on_doc, country_found, date_found } = newPost;
            // parseos y validaciones:
            // numberOnDoc, le saco los símbolos:
            let numberOnDocParsed;
            if (typeof number_on_doc === "string") {
                numberOnDocParsed = number_on_doc
                    .replace(/[^A-Za-z0-9]/g, "")
                    .toLowerCase();
            }
            // date_found: No necesito parsearla porque ya vino parseada por haber sido recién creada.
            const findMatchingSubscriptions = yield mongoDB_1.Subscription.find({
                name_on_doc: name_on_doc,
                number_on_doc: numberOnDocParsed,
                country_lost: country_found,
                date_lost: { $lte: date_found },
            }, {
                _id: 1,
                "user_subscribed._id": 1,
                "user_subscribed.name": 1,
                "user_subscribed.email": 1,
            })
                .lean()
                .exec();
            // Agregar en el email un link al detalle del post nuevo que coincide con su subscription. Para eso voy a necesitar el _id del nuevo post, y meterlo en el params de la url de nuestra página para que vea el detalle de la publicación. Por ejemplo :
            // www.lostfound.app/found/${_id}
            // let messageInEmail = "Hello, ${subscription.user_subscribed.name}! We've got great news!!! It seems that somebody found something that matches your subscription alert criteria. Go and check it out to see if this is your lucky day!
            // www.lostfound.app/found/${_id}
            // findMatchingSubscriptions.forEach(subscription => {
            // sendAlertEmailTo(subscription.user_subscribing.email, messageInEmail)
            // })
            return findMatchingSubscriptions;
        }
        catch (error) {
            console.log(`Error en fn findMatchingSuscriptions. ${error.message}`);
        }
    });
}
exports.findMatchingSuscriptions = findMatchingSuscriptions;
function handleUpdatePost(post_id, reqFromBody, user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const validatedData = (0, post_validators_1.validateUpdatePostData)(reqFromBody);
        const postInDB = yield mongoDB_1.Post.findById(post_id).exec();
        const userInDB = yield mongoDB_1.User.findById(user_id, { _id: 1 }).lean().exec();
        if (postInDB === null) {
            throw new Error(`Post con id "${post_id}" no fue encontrado en la base de datos.`);
        }
        if (userInDB === null) {
            throw new Error(`Usuario con id "${user_id} no fue encontrado en la base de datos.`);
        }
        if (postInDB.user_posting._id !== userInDB._id) {
            throw new Error(`El id del post no pertenece al usuario que desea modificarlo.`);
        }
        // let validatedDataKeys: string[] = Object.keys(validatedData);
        // for (let i = 0; i < validatedDataKeys.length; i++) {
        //   const element = validatedDataKeys[i];
        //   postInDB[element] = validatedData[element];
        // }
        postInDB.name_on_doc = validatedData.name_on_doc;
        postInDB.number_on_doc = validatedData.number_on_doc;
        postInDB.country_found = validatedData.country_found;
        postInDB.date_found = validatedData.date_found;
        postInDB.blurred_imgs = validatedData.blurred_imgs;
        postInDB.comments = validatedData.comments;
        yield postInDB.save();
        return postInDB;
    });
}
exports.handleUpdatePost = handleUpdatePost;
// DELETE POST :
function findPostByIdAndDeleteIt(post_id, user_id) {
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
        let postsDeleted = {
            userPosts: 0,
            postDocument: null,
        };
        //borrar referencia en User.posts:
        for (let i = 0; i < userInDB.posts.length; i++) {
            const element = userInDB.posts[i];
            if (element == postInDB._id) {
                userInDB.posts.splice(i, 1);
                postsDeleted.userPosts++;
            }
        }
        yield userInDB.save();
        // borrar documento en collection Post:
        const deletedPost = yield mongoDB_1.Post.findByIdAndDelete(post_id).exec();
        postsDeleted.postDocument = deletedPost;
        return postsDeleted;
    });
}
exports.findPostByIdAndDeleteIt = findPostByIdAndDeleteIt;
