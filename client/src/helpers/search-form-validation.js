export function formValidator({ name, number, country, date_lost }) {
  if ((!name && !number) || !country || !date_lost) return false;
  return true;
}

import { isStringBetweenXAndYCharsLong } from "./generic-validators";
import { validAttr } from "./validAttributesObj";
import { isValidDateBoolean } from "./generic-validators";
import { stringContainsURLs } from "./generic-validators";

export function searchFormValidator({ name, number, country, date_lost }, t) {
  try {
    // const { name, number, country_found, date_found, comments } = post;
    if (
      !isStringBetweenXAndYCharsLong(
        validAttr.name.minLength,
        validAttr.name.maxLength,
        name
      ) &&
      !isStringBetweenXAndYCharsLong(
        validAttr.number.minLength,
        validAttr.number.maxLength,
        number
      )
    ) {
      throw new Error(t("postForm.errorNameAndNumberFalsy"));
    }
    if (name.length > validAttr.name_on_doc.maxLength) {
      throw new Error(t("postForm.errorNameLength"));
    }
    if (number.length > validAttr.number_on_doc.maxLength) {
      throw new Error(t("postForm.errorNumberLength"));
    }
    if (stringContainsURLs(name) || stringContainsURLs(number)) {
      throw new Error(t("postForm.errorStringContainsURLs"));
    }

    if (country.length !== 2) {
      throw new Error(t("postForm.errorCountryInvalid"));
    }
    if (!date_lost) {
      throw new Error(t("postForm.errorDateFalsy"));
    }
    if (!isValidDateBoolean(date_lost)) {
      throw new Error(t("postForm.errorDateInvalid"));
    }
    return true;
  } catch (error) {
    return { error: error.message };
  }
}
