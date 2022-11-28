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
  return (
    argumento.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim) !==
    null
  );
}

//IS EMAIL :
export function isEmail(argumento) {
  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  return regex.test(argumento);
}

// IS VALID DATE = TRUE / FALSE :
export function isValidDateBoolean(date_found) {
  let dateNow = Date.now();
  let dateFoundParsed = Date.parse(date_found);
  if (typeof dateFoundParsed !== "number") {
    console.log("typeof dateFoundParsed !== 'number' ");
    return false;
  }
  if (dateNow < dateFoundParsed) {
    console.log("Error: La dateFound no puede ser mayor que la fecha actual.");
    return false;
  }
  return true;
}
