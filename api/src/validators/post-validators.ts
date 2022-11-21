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
import { DateTime } from "luxon";
import { countryList } from "../miscellanea/countryList";
import { IPost } from "../mongoDB/models/Post";
import { IUser } from "../mongoDB/models/User";
import {
  isFalsyArgument,
  isStringBetween1AndXCharsLong,
  stringContainsURLs,
} from "./genericValidators";

export function validatePost(bodyFromReq: any): IPost {
  const {
    name_on_doc,
    number_on_doc,
    country_found,
    date_found,
    blurred_imgs,
    comments,
    user_posting,
  } = bodyFromReq;
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

function checkNameOnDoc(nameFromReq: any): string {
  if (isStringBetween1AndXCharsLong(100, nameFromReq)) {
    if (stringContainsURLs(nameFromReq)) {
      throw new Error(`URLs are not allowed.`);
    }
    let nameParsedToLowerCase = nameFromReq.toLowerCase();
    return nameParsedToLowerCase;
  }
  throw new Error(`El nombre en el documento "${nameFromReq} no es válido.`);
}

function checkNumberOnDoc(numberOnDocFromReq: any): string {
  if (isStringBetween1AndXCharsLong(100, numberOnDocFromReq)) {
    // estos métodos dejan afuera las letras con tíldes. Pero como debería ser un número, no deberían haber caracteres de ese tipo.
    let onlyAlphaNumCharsAndLowerCased = numberOnDocFromReq
      .replace(/[^A-Za-z0-9]/g, "")
      .toLowerCase();
    return onlyAlphaNumCharsAndLowerCased;
  }
  throw new Error(`The document number "${numberOnDocFromReq}" is invalid.`);
}

// Buscar forma de tener los mismos países en el front que en el back. En el front se deberían ver los nombres de los países
function checkCountryFound(countryFromReq: any): string {
  // CHECKEAR SI EXISTE EN EL ARREGLO DE PAÍSES...
  for (let i = 0; i < countryList.length; i++) {
    const element = countryList[i];
    if (element === countryFromReq) {
      return element;
    }
  }
  throw new Error(`The country "${countryFromReq}" is invalid.`);
}

function checkDateFound(dateFromReq: any) {
  try {
    let parsedDate: any = DateTime.fromFormat(dateFromReq, "yyyy-MM-dd");
    if (parsedDate.invalid) {
      throw new Error(parsedDate.invalid?.explanation);
    }
    return parsedDate.toJSDate();
  } catch (error: any) {
    console.log(`Error en parseDate. ${error.message}`);
    throw new Error(error.message);
  }
}

//! parsear las imágenes que borronearlas, ya sea los números y letras con IA, o la imágen en general con el SDK de cloudinary o El otro "blur" o algo así.. :
function checkBlurredImgs(blurredImgsFromReq: any): string[] {
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

function checkComments(commentsFromReq: any): string | undefined {
  if (isFalsyArgument(commentsFromReq)) {
    return undefined;
  }
  let maxLength = 800;
  if (isStringBetween1AndXCharsLong(maxLength, commentsFromReq)) {
    if (stringContainsURLs(commentsFromReq)) {
      throw new Error(`URLs are not allowed.`);
    }
    return commentsFromReq;
  }
  throw new Error(
    `The comment entered is invalid. Please, enter a text of no more than ${maxLength} characters long or leave the input empty.`
  );
}

function checkUserPosting(userPosting: any): IUser {
  if (isFalsyArgument(userPosting)) {
    throw new Error(
      `Error in validation: The user posting can't be a falsy value.`
    );
  }
  return userPosting;
}
