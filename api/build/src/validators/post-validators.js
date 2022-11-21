"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePost = void 0;
// {
//   name_on_doc: {
//     type: String,
//     maxlength: 100,
//     required: true,
//     lowercase: true,
//   },
//   number_on_doc: {
//     type: String,
//     maxlength: 100,
//     required: true,
//     lowercase: true,
//   },
//   country_found: { type: String, required: true, lowercase: true },
//   date_found: { type: Date, required: true },
//   blurred_imgs: [{ type: String, required: false }],
//   comments: { type: String, maxlength: 800, required: false },
//   user_posting: userSchema,
// },
const luxon_1 = require("luxon");
const genericValidators_1 = require("./genericValidators");
const CountiesArrays_1 = require("../miscellanea/CountiesArrays");
function validatePost(bodyFromReq) {
    const { name_on_doc, number_on_doc, country_found, date_found, blurred_imgs, comments, user_posting, } = bodyFromReq;
    const validatedPost = {
        name_on_doc: checkNameOnDoc(name_on_doc),
        number_on_doc: checkNumberOnDoc(number_on_doc),
        country_found: checkCountryFound(country_found),
        date_found: checkDateFound(date_found),
        blurred_imgs: checkBlurredImgs(blurred_imgs),
        comments: checkComments(comments),
        user_posting: checkUserPosting(user_posting),
    };
    return validatedPost;
}
exports.validatePost = validatePost;
function checkNameOnDoc(nameFromReq) {
    if ((0, genericValidators_1.isStringBetween1AndXCharsLong)(100, nameFromReq)) {
        if ((0, genericValidators_1.stringContainsURLs)(nameFromReq)) {
            throw new Error(`URLs are not allowed.`);
        }
        let nameParsedToLowerCase = nameFromReq.toLowerCase();
        return nameParsedToLowerCase;
    }
    throw new Error(`El nombre en el documento "${nameFromReq} no es válido.`);
}
function checkNumberOnDoc(numberOnDocFromReq) {
    if ((0, genericValidators_1.isStringBetween1AndXCharsLong)(100, numberOnDocFromReq)) {
        // estos métodos dejan afuera las letras con tíldes. Pero como debería ser un número, no deberían haber caracteres de ese tipo.
        let onlyAlphaNumCharsAndLowerCased = numberOnDocFromReq
            .replace(/[^A-Za-z0-9]/g, "")
            .toLowerCase();
        return onlyAlphaNumCharsAndLowerCased;
    }
    throw new Error(`The document number "${numberOnDocFromReq}" is invalid.`);
}
// Buscar forma de tener los mismos países en el front que en el back. En el front se deberían ver los nombres de los países
function checkCountryFound(countryFromReq) {
    if (!(0, genericValidators_1.isStringXCharsLong)(2, countryFromReq)) {
        throw new Error(`The country must be a string 2 chars long.`);
    }
    // CHECKEAR SI EXISTE EN EL ARREGLO DE PAÍSES...
    for (let i = 0; i < CountiesArrays_1.arrayOfCountriesTwoChars.length; i++) {
        const element = CountiesArrays_1.arrayOfCountriesTwoChars[i];
        if (element === countryFromReq) {
            return element;
        }
    }
    throw new Error(`The country "${countryFromReq}" is invalid.`);
}
function checkDateFound(dateFromReq) {
    var _a;
    try {
        let parsedDate = luxon_1.DateTime.fromFormat(dateFromReq, "yyyy-MM-dd");
        if (parsedDate.invalid) {
            throw new Error((_a = parsedDate.invalid) === null || _a === void 0 ? void 0 : _a.explanation);
        }
        return parsedDate.toJSDate();
    }
    catch (error) {
        console.log(`Error en parseDate. ${error.message}`);
        throw new Error(error.message);
    }
}
//! parsear las imágenes que borronearlas, ya sea los números y letras con IA, o la imágen en general con el SDK de cloudinary o El otro "blur" o algo así.. :
function checkBlurredImgs(blurredImgsFromReq) {
    if (Array.isArray(blurredImgsFromReq)) {
        if (blurredImgsFromReq.length === 0) {
            return [];
        }
        let blurredImgs = blurredImgsFromReq.map((image) => {
            // aplicar fn que blurrea imágenes...
            return image;
        });
        return blurredImgs;
    }
    return [];
}
function checkComments(commentsFromReq) {
    if ((0, genericValidators_1.isFalsyArgument)(commentsFromReq)) {
        return undefined;
    }
    let maxLength = 800;
    if ((0, genericValidators_1.isStringBetween1AndXCharsLong)(maxLength, commentsFromReq)) {
        if ((0, genericValidators_1.stringContainsURLs)(commentsFromReq)) {
            throw new Error(`URLs are not allowed.`);
        }
        return commentsFromReq;
    }
    throw new Error(`The comment entered is invalid. Please, enter a text of no more than ${maxLength} characters long or leave the input empty.`);
}
function checkUserPosting(userPosting) {
    if ((0, genericValidators_1.isFalsyArgument)(userPosting)) {
        throw new Error(`Error in validation: The user posting can't be a falsy value.`);
    }
    return userPosting;
}
