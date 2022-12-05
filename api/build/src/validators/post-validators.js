"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCountry = exports.parseNumberOnDoc = exports.checkAndParseNumberOnDoc = exports.checkAndParseNameOnDoc = exports.validatePost = exports.validateUpdatePostData = void 0;
const genericValidators_1 = require("./genericValidators");
const CountiesArrays_1 = require("../miscellanea/CountiesArrays");
// VALIDATE UPDATE POST DATA :
function validateUpdatePostData(bodyFromReq) {
    const { name_on_doc, number_on_doc, country_found, date_found, blurred_imgs, comments, additional_contact_info, } = bodyFromReq;
    const validatedUpdatePostData = {
        name_on_doc: checkAndParseNameOnDoc(name_on_doc),
        number_on_doc: checkAndParseNumberOnDoc(number_on_doc),
        country_found: checkCountry(country_found),
        date_found: (0, genericValidators_1.checkAndParseDate)(date_found),
        blurred_imgs: checkBlurredImgs(blurred_imgs),
        comments: checkComments(comments),
        additional_contact_info: checkAdditionalContactInfo(additional_contact_info),
    };
    return validatedUpdatePostData;
}
exports.validateUpdatePostData = validateUpdatePostData;
// VALIDATE NEW POST :
function validatePost(bodyFromReq) {
    const { name_on_doc, number_on_doc, country_found, date_found, blurred_imgs, comments, user_posting, additional_contact_info, } = bodyFromReq;
    const validatedPost = {
        name_on_doc: checkAndParseNameOnDoc(name_on_doc),
        number_on_doc: checkAndParseNumberOnDoc(number_on_doc),
        country_found: checkCountry(country_found),
        date_found: (0, genericValidators_1.checkAndParseDate)(date_found),
        blurred_imgs: checkBlurredImgs(blurred_imgs),
        comments: checkComments(comments),
        user_posting: checkUserPosting(user_posting, additional_contact_info),
    };
    return validatedPost;
}
exports.validatePost = validatePost;
// CHECK ADDITIONAL CONTACT INFO :
function checkAdditionalContactInfo(addContactInfoFromReq) {
    if (!addContactInfoFromReq) {
        return undefined;
    }
    if ((0, genericValidators_1.isStringBetween1AndXCharsLong)(150, addContactInfoFromReq)) {
        return addContactInfoFromReq;
    }
    throw new Error(`La información de contacto adicional '${addContactInfoFromReq}' no es válida. Ingrese una cadena de texto de hasta 150 caracteres de largo.`);
}
function checkAndParseNameOnDoc(nameFromReq) {
    if ((0, genericValidators_1.isStringBetween1AndXCharsLong)(100, nameFromReq)) {
        if ((0, genericValidators_1.stringContainsURLs)(nameFromReq)) {
            throw new Error(`URLs are not allowed.`);
        }
        let nameParsedToLowerCase = nameFromReq.toLowerCase().trim();
        return nameParsedToLowerCase;
    }
    throw new Error(`El nombre en el documento "${nameFromReq} no es válido.`);
}
exports.checkAndParseNameOnDoc = checkAndParseNameOnDoc;
function checkAndParseNumberOnDoc(numberOnDocFromReq) {
    if (!numberOnDocFromReq) {
        return undefined;
    }
    if ((0, genericValidators_1.isStringBetween1AndXCharsLong)(100, numberOnDocFromReq)) {
        // estos métodos dejan afuera las letras con tíldes. Pero como debería ser un número, no deberían haber caracteres de ese tipo.
        // let onlyAlphaNumCharsAndLowerCased = numberOnDocFromReq
        //   .replace(/[^A-Za-z0-9]/g, "")
        //   .toLowerCase();
        // return onlyAlphaNumCharsAndLowerCased;
        return parseNumberOnDoc(numberOnDocFromReq);
    }
    throw new Error(`The document number "${numberOnDocFromReq}" is invalid.`);
}
exports.checkAndParseNumberOnDoc = checkAndParseNumberOnDoc;
// PARSE NUMBER ON DOC :
function parseNumberOnDoc(numberOnDocFromReq) {
    // excluyen los símbolos y sólo deja caracteres alfanuméricos y en lowercase :
    let onlyAlphaNumCharsAndLowerCased = numberOnDocFromReq
        .trim()
        .replace(/[^A-Za-z0-9]/g, "")
        .toLowerCase();
    return onlyAlphaNumCharsAndLowerCased;
}
exports.parseNumberOnDoc = parseNumberOnDoc;
// Buscar forma de tener los mismos países en el front que en el back. En el front se deberían ver los nombres de los países.
// Podría ordenar el arreglo para que los países más populares estén en los primeros elementos de la lista para que encuentre el match rápidamente.
// Crear índices en MongoDB
function checkCountry(countryFromReq) {
    if (!(0, genericValidators_1.isStringXCharsLong)(2, countryFromReq)) {
        throw new Error(`The country must be a string 2 chars long.`);
    }
    let countryFromReqLowerCased = countryFromReq.toLowerCase();
    // CHECKEAR SI EXISTE EN EL ARREGLO DE PAÍSES...
    for (let i = 0; i < CountiesArrays_1.arrayOfCountriesTwoChars.length; i++) {
        const element = CountiesArrays_1.arrayOfCountriesTwoChars[i];
        if (element.toLowerCase() === countryFromReqLowerCased) {
            return element.toLowerCase();
        }
    }
    throw new Error(`The country "${countryFromReq}" is invalid.`);
}
exports.checkCountry = checkCountry;
// CHECK BLURRED IMGS :
//! parsear las imágenes que borronearlas, ya sea los números y letras con IA, o la imágen en general con el SDK de cloudinary o El otro "blur" o algo así.. :
function checkBlurredImgs(blurredImgsFromReq) {
    if (Array.isArray(blurredImgsFromReq)) {
        if (blurredImgsFromReq.length === 0) {
            return [];
        }
        let blurredImgs = blurredImgsFromReq.map((image) => {
            // aplicar fn que blurrea imágenes...
            if ((0, genericValidators_1.isValidURLImage)(image)) {
                return image;
            }
            else {
                throw new Error("La imagen no tiene un formato válido.");
            }
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
function checkUserPosting(userPosting, additional_contact_info) {
    if ((0, genericValidators_1.isFalsyArgument)(userPosting)) {
        throw new Error(`Error in validation: The user posting can't be a falsy value.`);
    }
    let userPostingObj = {
        _id: userPosting._id,
        name: userPosting.name,
        email: userPosting.email,
        profile_img: userPosting.profile_img,
    };
    if (additional_contact_info) {
        if ((0, genericValidators_1.stringContainsURLs)(additional_contact_info)) {
            throw new Error("The additional contact information has URLs.");
        }
    }
    if ((0, genericValidators_1.isStringBetween1AndXCharsLong)(150, additional_contact_info)) {
        userPostingObj.additional_contact_info = additional_contact_info;
    }
    return userPostingObj;
}
