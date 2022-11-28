import { isEmail } from "./generic-validators";
import { isValidURLImage } from "./generic-validators";
import { stringContainsURLs } from "./generic-validators";
import { isStringBetweenXAndYCharsLong } from "./generic-validators";
import { validAttr } from "./validAttributesObj";

// REGISTER FORM VALIDATOR :
// post = {
//   name = "Carlos Juanchez",
//   email = "carlosJuan@gmail.com",
//   profile_img: "www.imagesapi/icon/pictures/asd.jpg"
// }
// t = i18next fn
export function registerFormValidator(post, t) {
  try {
    console.log("POST EN FORM VALIDATOR = ", post);
    const { name, email, profile_img } = post;
    const validatedFormData = {
      name: validateName(name, t),
      email: validateEmail(email, t),
      profile_img: validateProfile_img(profile_img, t),
    };
    return validatedFormData;
  } catch (error) {
    console.log("ERROR = ", error);
    return { error: error.message };
  }
}

function validateEmail(email, t) {
  console.log("Is EMAIL ? ", isEmail(email));
  if (email && isEmail(email)) {
    console.log("retornando email... ");
    return email;
  }
  throw new Error(t("registerForm.errorInvalidEmail"));
}

function validateProfile_img(profile_img, t) {
  if (!profile_img) {
    return "";
  }
  if (isValidURLImage(profile_img) || stringContainsURLs(profile_img)) {
    return profile_img;
  }
  throw new Error(t("registerForm.errorInvalidProfileImg"));
}

function validateName(nameFromReq, t) {
  if (!nameFromReq) {
    throw new Error(t("registerForm.errorUserNameInvalid"));
  }
  if (stringContainsURLs(nameFromReq)) {
    throw new Error(t("registerForm.errorUserNameURL"));
  }
  if (
    !isStringBetweenXAndYCharsLong(
      validAttr.name.minLength,
      validAttr.name.maxLength,
      nameFromReq
    )
  ) {
    throw new Error(t("registerForm.errorUserNameInvalid"));
  }
  return nameFromReq;
}
