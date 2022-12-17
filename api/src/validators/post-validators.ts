import {
  checkAndParseDate,
  isFalsyArgument,
  isStringBetween1AndXCharsLong,
  isStringXCharsLong,
  isValidURLImage,
  sanitizeSimbols,
  stringContainsURLs,
} from "./genericValidators";
import { arrayOfCountriesTwoChars } from "../utils/miscellanea/CountiesArrays";
import { IUserPosting } from "../mongoDB/models/Post";
import validator from "validator";
import xss from "xss";

// VALIDATE UPDATE POST DATA :
export function validateUpdatePostData(bodyFromReq: any): {
  name_on_doc: string;
  number_on_doc: string | undefined;
  country_found: string;
  date_found: any;
  blurred_imgs: string[];
  comments: string | undefined;
  additional_contact_info: string | undefined;
} {
  const {
    name_on_doc,
    number_on_doc,
    country_found,
    date_found,
    blurred_imgs,
    comments,
    additional_contact_info,
  } = bodyFromReq;

  const validatedUpdatePostData = {
    name_on_doc: checkAndParseNameOnDoc(name_on_doc),
    number_on_doc: checkAndParseNumberOnDoc(number_on_doc),
    country_found: checkCountry(country_found),
    date_found: checkAndParseDate(date_found),
    blurred_imgs: checkBlurredImgs(blurred_imgs),
    comments: checkComments(comments),
    additional_contact_info: checkAdditionalContactInfo(
      additional_contact_info
    ),
  };
  return validatedUpdatePostData;
}

// VALIDATE NEW POST :
export function validatePost(bodyFromReq: any): {
  name_on_doc: string;
  number_on_doc: string | undefined;
  country_found: string;
  date_found: any;
  blurred_imgs: string[];
  comments: string | undefined;
  user_posting: IUserPosting;
} {
  const {
    name_on_doc,
    number_on_doc,
    country_found,
    date_found,
    blurred_imgs,
    comments,
    user_posting,
    additional_contact_info,
  } = bodyFromReq;

  const validatedPost = {
    name_on_doc: checkAndParseNameOnDoc(name_on_doc),
    number_on_doc: checkAndParseNumberOnDoc(number_on_doc),
    country_found: checkCountry(country_found),
    date_found: checkAndParseDate(date_found),
    blurred_imgs: checkBlurredImgs(blurred_imgs),
    comments: checkComments(comments),
    user_posting: checkUserPosting(user_posting, additional_contact_info),
  };
  return validatedPost;
}

// CHECK ADDITIONAL CONTACT INFO :
function checkAdditionalContactInfo(
  addContactInfoFromReq: any
): string | undefined {
  if (!addContactInfoFromReq) {
    return undefined;
  }
  if (isStringBetween1AndXCharsLong(150, addContactInfoFromReq)) {
    return validator.escape(addContactInfoFromReq);
  }
  throw new Error(
    `La información de contacto adicional '${addContactInfoFromReq}' no es válida. Ingrese una cadena de texto de hasta 150 caracteres de largo.`
  );
}

export function checkAndParseNameOnDoc(nameFromReq: any): string {
  if (isStringBetween1AndXCharsLong(100, nameFromReq)) {
    if (stringContainsURLs(nameFromReq)) {
      throw new Error(`URLs are not allowed.`);
    }
    let nameParsedToLowerCase = nameFromReq.toLowerCase().trim();
    return sanitizeSimbols(nameParsedToLowerCase);
    // return validator.escape(nameParsedToLowerCase);
  }
  throw new Error(`El nombre en el documento "${nameFromReq} no es válido.`);
}

export function checkAndParseNumberOnDoc(
  numberOnDocFromReq: string | undefined
): string | undefined {
  if (!numberOnDocFromReq) {
    return undefined;
  }
  if (isStringBetween1AndXCharsLong(100, numberOnDocFromReq)) {
    // estos métodos dejan afuera las letras con tíldes. Pero como debería ser un número, no deberían haber caracteres de ese tipo.
    // let onlyAlphaNumCharsAndLowerCased = numberOnDocFromReq
    //   .replace(/[^A-Za-z0-9]/g, "")
    //   .toLowerCase();
    // return onlyAlphaNumCharsAndLowerCased;
    return parseNumberOnDoc(numberOnDocFromReq);
  }
  throw new Error(`The document number "${numberOnDocFromReq}" is invalid.`);
}

// PARSE NUMBER ON DOC :
export function parseNumberOnDoc(numberOnDocFromReq: string): string {
  // excluyen los símbolos y sólo deja caracteres alfanuméricos y en lowercase :
  let onlyAlphaNumCharsAndLowerCased = numberOnDocFromReq
    .trim()
    .replace(/[^A-Za-z0-9]/g, "")
    .toLowerCase();
  return onlyAlphaNumCharsAndLowerCased;
}

// Buscar forma de tener los mismos países en el front que en el back. En el front se deberían ver los nombres de los países.
// Podría ordenar el arreglo para que los países más populares estén en los primeros elementos de la lista para que encuentre el match rápidamente.
// Crear índices en MongoDB
export function checkCountry(countryFromReq: any): string {
  if (!isStringXCharsLong(2, countryFromReq)) {
    throw new Error(`The country must be a string 2 chars long.`);
  }
  let countryFromReqLowerCased = countryFromReq.toLowerCase();
  // CHECKEAR SI EXISTE EN EL ARREGLO DE PAÍSES...
  for (let i = 0; i < arrayOfCountriesTwoChars.length; i++) {
    const element = arrayOfCountriesTwoChars[i];
    if (element.toLowerCase() === countryFromReqLowerCased) {
      return element.toLowerCase();
    }
  }
  throw new Error(`The country "${countryFromReq}" is invalid.`);
}

// CHECK BLURRED IMGS :
//! parsear las imágenes que borronearlas, ya sea los números y letras con IA, o la imágen en general con el SDK de cloudinary o El otro "blur" o algo así.. :
function checkBlurredImgs(blurredImgsFromReq: any): string[] {
  if (Array.isArray(blurredImgsFromReq)) {
    if (blurredImgsFromReq.length === 0) {
      return [];
    }
    let blurredImgs = blurredImgsFromReq.map((image) => {
      // aplicar fn que blurrea imágenes...
      if (isValidURLImage(image)) {
        return xss(image);
        // return validator.escape(image);
      } else {
        throw new Error("La imagen no tiene un formato válido.");
      }
    });
    return blurredImgs;
  }
  return [];
}

function checkComments(commentsFromReq: any): string | undefined {
  if (isFalsyArgument(commentsFromReq)) {
    return undefined;
  }
  let maxLength = 800;
  if (isStringBetween1AndXCharsLong(maxLength, commentsFromReq)) {
    if (stringContainsURLs(commentsFromReq)) {
      throw new Error(`URLs are not allowed.`);
    }
    return xss(commentsFromReq);
    // return validator.escape(commentsFromReq);
  }
  throw new Error(
    `The comment entered is invalid. Please, enter a text of no more than ${maxLength} characters long or leave the input empty.`
  );
}

function checkUserPosting(
  userPosting: any,
  additional_contact_info: string | undefined
): IUserPosting {
  if (isFalsyArgument(userPosting)) {
    throw new Error(
      `Error in validation: The user posting can't be a falsy value.`
    );
  }

  let userPostingObj: IUserPosting = {
    _id: userPosting._id,
    name: userPosting.name,
    email: userPosting.email,
    profile_img: userPosting.profile_img,
  };
  if (additional_contact_info) {
    if (stringContainsURLs(additional_contact_info)) {
      throw new Error("The additional contact information has URLs.");
    }
    if (isStringBetween1AndXCharsLong(150, additional_contact_info)) {
      userPostingObj.additional_contact_info = xss(additional_contact_info);
    }
  }

  return userPostingObj;
}
