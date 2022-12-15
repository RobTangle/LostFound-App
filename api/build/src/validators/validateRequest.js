"use strict";
const validator = require("validator");
const safe = require("safe-regex");
//IS EMAIL :
function isEmail(argumento) {
    if (argumento.length > 150) {
        console.log("Error en fn val isEmail. El argumento es demasiado largo.");
        throw new Error("The email length is too long");
    }
    let argTrimmed = argumento.trim();
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])");
    return regex.test(argTrimmed);
}
// IS VALID URL IMAGE :
function isValidURLImage(argumento) {
    if (typeof argumento !== "string") {
        console.log("La URL Image no es typeof string");
        return false;
    }
    if (argumento.length > 512) {
        console.log("Error en val fn isValidURLImage. El argumento es demasiado largo.");
        return false;
    }
    return (argumento.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.))?$/gim) !==
        null);
}
const email1 = "rob@hos.com";
const email2 = "r@s.o";
// console.log(validator.isEmail(email1));
console.log(validator.isEmail(email2));
console.log("is Alpha", validator.isAlphanumeric("hola"));
console.log("contains", validator.contains("hola", [""]));
console.log("matches", validator.matches("http://hola.com.jpg", /^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim));
console.log("safe", safe(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.))?$/));
let safeRegexURL = new RegExp(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.))?$/);
let unsafeRegexURL = new RegExp(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/);
console.log("safeNew", safe(safeRegexURL));
console.log("unsafe", safe(unsafeRegexURL));
console.log("isURL = ", validator.matches("http://hola.jpg", safeRegexURL));
console.log("isURLunsafe = ", validator.matches("http://hola.jpg", unsafeRegexURL));
function isValidURLImageValidator(string) {
    const safeRegexIsURLImage = new RegExp(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.))?$/);
    console.log("is safe regex = ", safe(safeRegexIsURLImage));
    return validator.matches(string, safeRegexIsURLImage);
}
console.log("valid urls asdsa =", isValidURLImageValidator("https://www.hola.jpg"));
let emailRegex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])");
console.log("emaiLRegexSafu", safe(emailRegex));
const reg = /[&<>'{},.$%()!´`\[\]/]/gi;
const regnewreg = new RegExp(reg);
console.log("regnrweas = ", safe(regnewreg));
const containsURLsRegex = new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.)?");
console.log("contains urls regex = ", safe(containsURLsRegex));
function stringContainsURLs(argumento) {
    if (typeof argumento !== "string") {
        console.log("Error en val fn stringContainsURLs. El argumento no es un string.");
        throw new Error("The argument must be a string");
    }
    if (argumento.length > 800) {
        console.log("Error en fn val stringContainsURLs: El argumento es demasiado largo.");
        throw new Error("El argumento es demasiado largo.");
    }
    let argTrimmed = argumento.trim();
    if (new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(argTrimmed)) {
        return true;
    }
    else {
        return false;
    }
}
console.log(Date.now());
const inicio = Date.now();
console.log(stringContainsURLs("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa "));
const fin = Date.now();
console.log(fin - inicio);
function isValidURLImageValidator(string) {
    const safeRegexIsURLImage = new RegExp(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.))?$/);
    console.log("is safe regex = ", safe(safeRegexIsURLImage));
    return validator.matches(string, safeRegexIsURLImage);
}
const date1 = Date.now();
console.log(isValidURLImageValidator("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa "));
const datef1 = Date.now();
console.log(datef1 - date1);
const date6 = Date.now();
console.log(isValidURLImage("https://www.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.jpgw.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.jw.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.jw.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.jw.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.jw.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.jw.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.jw.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.jpg"));
const datef6 = Date.now();
console.log(datef6 - date6);
// Sanitize HTML And JS Simbols :
function sanitizeHTMLAndJSSimbols(string) {
    if (typeof string !== "string") {
        console.log(`Error en sanitizeID. El typeof del id no es un string.`);
        throw new Error("Something went wrong.");
    }
    if (string.length > 50) {
        console.log("Error en sanitizeID. El string es demasiado largo.");
        throw new Error("Something went wrong.");
    }
    const map = {
        "{": "",
        "}": "",
        "[": "",
        "]": "",
        "|": "",
        "?": "",
        "<": "",
        ">": "",
        "/": "",
        "&": "",
        "'": "",
        '"': "",
    };
    const reg = /[&<{}>|?\[\]'"\/]/gi;
    return string.replace(reg, (match) => map[match]);
}
