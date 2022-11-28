import { stringContainsURLs } from "./generic-validators";
import { isStringBetweenXAndYCharsLong } from "./generic-validators";
import { isValidDateBoolean } from "./generic-validators";
import { validAttr } from "./validAttributesObj";

//* -------- SUSCRIPTION FORM VALIDATOR :  ---------- --------------------------

export function subscriptionFormValidator(suscription, t) {
  try {
    const { name_on_doc, number_on_doc, country_lost, date_lost } = suscription;
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
      throw new Error(t("subscriptionForm.errorNameAndNumberFalsy"));
    }
    if (name_on_doc.length > validAttr.name_on_doc.maxLength) {
      throw new Error(t("subscriptionForm.errorNameLength"));
    }
    if (number_on_doc.length > validAttr.number_on_doc.maxLength) {
      throw new Error(t("subscriptionForm.errorNumberLength"));
    }
    if (stringContainsURLs(name_on_doc) || stringContainsURLs(number_on_doc)) {
      throw new Error(t("subscriptionForm.errorStringContainsURLs"));
    }

    if (country_lost.length !== 2) {
      throw new Error(t("subscriptionForm.errorCountryInvalid"));
    }
    if (!date_lost) {
      throw new Error(t("subscriptionForm.errorDateFalsy"));
    }
    if (!isValidDateBoolean(date_lost)) {
      throw new Error(t("subscriptionForm.errorDateInvalid"));
    }
    return true;
  } catch (error) {
    return { error: error.message };
  }
}
