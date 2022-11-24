import { DateTime } from "luxon";
import { isValidObjectId } from "mongoose";

// IS STRING:
export function isString(argumento: any): boolean {
  if (typeof argumento !== "string") {
    return false;
  }
  return true;
}

// IS STRING X CHARS LONG:
export function isStringXCharsLong(x: number, argument: any): boolean {
  let error = `Error en aux fn isStringXCharsLong. The argument "x" must be a positive number.`;
  if (!x || typeof x !== "number" || x < 1) {
    console.log(error);
    throw new Error(error);
  }
  if (argument && typeof argument === "string" && argument.length === x) {
    return true;
  } else {
    return false;
  }
}

// IS VALID STRING:
export function isValidString(argumento: any): boolean {
  if (typeof argumento === "string" && argumento.length > 0) {
    return true;
  } else {
    return false;
  }
}

// IS EMPTY STRING:
export function isEmptyString(argumento: any): boolean {
  if (typeof argumento === "string" && argumento.length === 0) {
    return true;
  } else {
    return false;
  }
}

// funcion auxiliar para chequear strings y su largo
export function isStringBetween1And101CharsLong(argumento: any): boolean {
  if (
    typeof argumento === "string" &&
    argumento.length >= 1 &&
    argumento.length <= 100
  ) {
    return true;
  }
  return false;
}

// IS STRING BETWEEN 1 AND 50 CHARACTERS LONG:
export function isStringBetween1And50CharsLong(argumento: any): boolean {
  if (
    typeof argumento === "string" &&
    argumento.length > 0 &&
    argumento.length <= 50
  ) {
    return true;
  } else {
    return false;
  }
}

// IS STRING BETWEEN 1 AND X CHARACTERS LONG:
export function isStringBetween1AndXCharsLong(
  x: number,
  argumento: any
): boolean {
  let error = `The argument "x" must be a positive number`;
  if (!x || typeof x !== "number" || x < 1) {
    throw new Error(error);
  }
  let maxCharsLong = x;
  if (
    typeof argumento === "string" &&
    argumento.length >= 1 &&
    argumento.length <= maxCharsLong
  ) {
    return true;
  } else {
    return false;
  }
}

// IS STRING BETWEEN X AND Y CHARACTERS LONG:
export function isStringBetweenXAndYCharsLong(
  x: number,
  y: number,
  argumento: any
): boolean {
  let error = `The argument "x" must be a positive number`;
  if (!x || typeof x !== "number" || x < 1) {
    throw new Error(`The argument "x" must be a positive integer number`);
  }
  let minCharsLong = x;
  if (!y || typeof y !== "number" || y < 1) {
    throw new Error(`The argument "y" must be a positive integer number.`);
  }
  let maxCharsLong = y;
  if (
    typeof argumento === "string" &&
    argumento.length >= minCharsLong &&
    argumento.length <= maxCharsLong
  ) {
    return true;
  } else {
    return false;
  }
}

// IS FALSY ARGUMENT
export function isFalsyArgument(argumento: any): boolean {
  if (!argumento) {
    return true;
  } else {
    return false;
  }
}

// is UNDEFINEDorNULL:
export function isUndefinedOrNull(argumento: any): boolean {
  if (argumento === undefined || argumento === null) {
    return true;
  }
  return false;
}

// IS VALID ID:
export function isValidSenasaId(argumento: any): boolean {
  if (typeof argumento === "string" && argumento.length === 16) {
    return true;
  }
  return false;
}

//IS TYPE OF NUMBER:
export function isTypeofNumber(argumento: any): boolean {
  if (typeof argumento === "number") {
    return true;
  } else {
    return false;
  }
}

//IS EMAIL :
export function isEmail(argumento: any): boolean {
  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  return regex.test(argumento);
}

// IS VALID URL IMAGE :
export function isValidURLImage(argumento: any): boolean {
  if (typeof argumento !== "string") {
    return false;
  }
  return (
    argumento.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim) !==
    null
  );
}

// PARSE STRING TO BOOLEAN :
export function stringToBoolean(argumento: any): boolean {
  if (argumento === "true") {
    return true;
  }
  if (argumento === "false") {
    return false;
  }
  throw new Error(`El argumento '${argumento}' es inválido.`);
}

// STRING CONTAINS URLS :
export function stringContainsURLs(argumento: string): boolean {
  if (
    new RegExp(
      "([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?"
    ).test(argumento)
  ) {
    return true;
  } else {
    return false;
  }
}

export function checkObjectId(id: string) {
  if (isValidObjectId(id)) {
    return id;
  } else {
    throw new Error(`El id "${id}" no es un ObjectId válido.`);
  }
}

export function checkAndParseDate(dateFromReq: string): Date {
  try {
    let parsedAndValidated = DateTime.fromISO(dateFromReq);
    return parsedAndValidated.toJSDate();
  } catch (error: any) {
    console.log(`Error en checkAndParseDate. ${error.message}`);
    throw new Error(error.message);
  }
}

// let dateIsoFormat = "2022-11-11T03:00:00.000Z";
// let dateInputFormat = "2022-11-11";
// let parsed = DateTime.fromISO(dateIsoFormat);
// console.log(parsed.toJSDate());
// let fromInputSmall = DateTime.fromISO(dateInputFormat);
// console.log(fromInputSmall.toJSDate());
