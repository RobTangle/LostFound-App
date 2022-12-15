import validator from "validator";

// IS STRING BETWEEN X AND Y CHARACTERS LONG:
export function isStringBetweenXAndYCharsLong(x, y, argumento) {
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

// STRING CONTAINS URLS :
export function stringContainsURLs(argumento) {
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

// IS VALID URL IMAGE :
export function isValidURLImage(argumento) {
  if (typeof argumento !== "string") {
    return false;
  }
  if (argumento.length > 1000) {
    console.log(
      "Error en isValidURLImage. El string ingresado es demasiado largo."
    );
    return false;
  }
  const imageURLRegex = new RegExp(
    /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif)$/
  );
  return argumento.match(imageURLRegex) !== null;
}

//IS EMAIL :
export function isEmail(argumento) {
  return validator.isEmail(argumento);
}

// IS VALID DATE = TRUE / FALSE :
// Checks if the date argument is higher or lower than the current date.
export function isValidDateBoolean(date_found) {
  let dateNow = Date.now();
  let dateFoundParsed = Date.parse(date_found);
  if (typeof dateFoundParsed !== "number" || isNaN(dateFoundParsed)) {
    console.log("typeof dateFoundParsed !== 'number' ");
    return false;
  }
  if (dateNow < dateFoundParsed) {
    console.log("Error: La dateFound no puede ser mayor que la fecha actual.");
    return false;
  }
  return true;
}
