// VALID ATTRIBUTES :
export const validAttr = {
  name_on_doc: {
    maxLength: 60,
    minLength: 3,
  },
  number_on_doc: {
    maxLength: 50,
    minLength: 3,
  },
  comments: {
    maxLength: 800,
    minLength: 0,
  },
};

// POST FORM VALIDATOR :
export function postFormValidator(post, t) {
  try {
    const { name_on_doc, number_on_doc, country_found, date_found, comments } =
      post;
    if (
      !isStringBetweenXAndYCharsLong(
        validAttr.name_on_doc.minLength,
        validAttr.name_on_doc.maxLength,
        name_on_doc
      ) &&
      !isStringBetweenXAndYCharsLong(
        validAttr.number_on_doc.minLength,
        validAttr.number_on_doc.maxLength,
        number_on_doc
      )
    ) {
      throw new Error(t("postForm.errorNameAndNumberFalsy"));
    }
    if (name_on_doc.length > validAttr.name_on_doc.maxLength) {
      throw new Error(t("postForm.errorNameLength"));
    }
    if (number_on_doc.length > validAttr.number_on_doc.maxLength) {
      throw new Error(t("postForm.errorNumberLength"));
    }
    if (
      stringContainsURLs(name_on_doc) ||
      stringContainsURLs(number_on_doc) ||
      stringContainsURLs(comments)
    ) {
      throw new Error(t("postForm.errorStringContainsURLs"));
    }
    if (comments.length > validAttr.comments.maxLength) {
      throw new Error(t("postForm.errorCommentsLength"));
    }
    if (country_found.length !== 2) {
      throw new Error(t("postForm.errorCountryInvalid"));
    }
    if (!date_found) {
      throw new Error(t("postForm.errorDateFalsy"));
    }
    if (!checkDate(date_found)) {
      throw new Error(t("postForm.errorDateInvalid"));
    }
    return true;
  } catch (error) {
    return { error: error.message };
  }
}

// check Date :
function checkDate(date_found) {
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
