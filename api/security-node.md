# Security checklist for NodeJS Server:

1. Helmet
2. Express-rate-limit
3. DoS Attacks
4. XSS
5. SQL Injections
6. NoSQL Injections
7. Server side JS injection
8. Error stack trace 2.
9. Limit payload size using a reverse-proxy or a middleware
10. GitHub CodeQL Analysis
11. Notes for using cookies

### Complete Node Best Practices Guide : https://github.com/goldbergyoni/nodebestpractices

## Details:

1. **Usar Helmet.**: npm helmet

2. **Request Rate Limiting:** Establecer un máximo de request / tiempo desde una misma IP.
   npm express-rate-limit

3. **DoS Attacks (Denial of Service):**
   The risk that is inherent with the use of Regular Expressions is the computational resources that require to parse text and match a given pattern. For the Node.js platform, where a single-thread event-loop is dominant, a CPU-bound operation like resolving a regular expression pattern will render the application unresponsive. Avoid RegEx when possible or defer the task to a dedicated library like validator.js, or safe-regex to check if the RegEx pattern is safe.

   Some Regular Expressions may be “unsafe” for some inputs, i.e (a+)+ regex is unsafe for input aaaaaaaaaaaaaaaaaaaaa! as it will lead the regex evaluation to exponential time complexity causing the server to Denial of Service.

Fortunately there is an NPM package that helps us detect vulnerable RegExes and it is called “safe-regex”
It is used like this:
<code>

var safe = require(‘safe-regex’);

var regex = new RegExp(‘(a+)+’);

console.log(safe(regex));
</code>

It will return a boolean value indicating if the regex is safe or not.

https://lirantal.medium.com/node-js-pitfalls-how-a-regex-can-bring-your-system-down-cbf1dc6c4e02

https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/security/regex.md

TIPS:

- Use npm safe-regex to check if the regex you are using is safe or not.
- Whenever you can, use a regex check created by some trusty package in stead of create your owns.

4. **XSS (Cross Site Scripting):** we should always perform data validation and sanitization. This means that for every incoming request we should check that the input parameters given by the user are in the correct format, the one that the server and the database expect to be. Another useful tip is to set the cookie httpOnly value to true because it prevents cookies from being accessed by browser JS scripts.
   Also, we should always HTML Escape data before inserting it into HTML Elements (ex: convert & to &amp ; and < to &lt ; ,etc). This will probably neutralize some XSS threats.

   Tips:

- Think when certain simbols like < > & ` { } [ ] should be allowed.

- **Escape** (transform a < into &lt ; ) user inputs.

- **Sanitize** (replace ilegal simbols with empty strings or steril characters).

- Escape or sanitize user inputs when necessary.

- Use a custom function to escape this characters, or a package like "validator" to sanitize or escape strings.

- React and Angular have some default protectiong agains XSS. Although, be extremely careful using tags like "innerHTML" and "dangerouslySetInnerHTML".

- React tiene, por default, cierta protección contra XSS al transformar a string los valores de las variables.

5. **SQL injections in general:** How to prevent them
   Once again, data validation and sanitization is the best way to eliminate these threats. NPM Packages like sqlstring , escape user input values and thus it makes the vulnerability very difficult for a malicious user to exploit it. Also, packages like sql-query-builder that offer you the ability to create SQL queries in a more structured way

   https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/security/ormodmusage.md

6. **NoSQL injections:** Especial cuidado cuando paso valores al argumento "filter". Una buena práctica que usar la opción sanitizeFilter de Mongoose, o el operador $eq.

   http://thecodebarbarian.com/whats-new-in-mongoose-6-sanitizefilter.html

   https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/security/ormodmusage.md

7. **Server side JS injection:** Also known as SSJS.
   It is the case where user input is directly passed in native JS functions like eval(),setTimeout(), setInterval() or Function(). So we should simply avoid using these functions at any cost. These functions consist a bad practice even if we validate and sanitize user input data. In order to prevent it just use JSON.parse(), it is much safer.

8. **Cuidarse de los error stack trace:** Los mensajes de error tienen que ser genéricos, y/o custom. No dar pistas del error preciso ya que el hacker puede ayudarse de esos mensajes de error para precisar sus ataques.

https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/security/hideerrors.md

9. **Limit payload size using a reverse-proxy or a middleware:** Parsing request bodies, for example JSON-encoded payloads, is a performance-heavy operation, especially with larger requests. When handling incoming requests in your web application, you should limit the size of their respective payloads. Incoming requests with unlimited body/payload sizes can lead to your application performing badly or crashing due to a denial-of-service outage or other unwanted side-effects. Many popular middleware-solutions for parsing request bodies, such as the already-included body-parser package for express, expose options to limit the sizes of request payloads, making it easy for developers to implement this functionality. You can also integrate a request body size limit in your reverse-proxy/web server software if supported. Below are examples for limiting request sizes using express and/or nginx.

<code>app.use(express.json({ limit: '300kb' })); // body-parser defaults to a body size limit of 100kb </code>

https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/security/requestpayloadsizelimit.md

10. **Usar GitHub Security script CodeQL Analysis:** Activar el script en el repositorio desde la pestaña "Security".

Si se usan cookie y sessions, ver las configuraciones particular a tener en cuenta.

# Resumen:

npm helmet

npm express-rate-limit

npm validator

npm safe-regex

custom functions: sanitize & escape

generic/custom error messages

GitHub CodeQL Analysis

NoSQL Injections considerations: Use "sanitizeFilter" option, or $eq operator.

SQL Injection considerations.

When possible, avoid using (handmade) RegExp.

Limit user input string length when using regex.

# Utility functions:

**Check email:** <code> validator.isEmail(argument) </code>

**sanitize HTML dangerous simbols:** < > & ; " ' /

\*It replaces the simbols for an empty string.

<pre>
export function sanitizeHTMLSimbols(string: unknown) {
  if (typeof string !== "string") {
    console.log(`Error en sanitizeID. El typeof del id no es un string.`);
    throw new Error("Something went wrong.");
  }
  if (string.length > 50) {
    console.log("Error en sanitizeID. El string es demasiado largo.");
    throw new Error("Something went wrong.");
}
const map: any = {
"<": "",
">": "",
"/": "",
"&": "",
"'": "",
'"': ""
  };
  const reg = /[&<>'"\//gi;
return string.replace(reg, (match: string | number) => map[match]);
}
</pre>

<pre>
function isValidURLImageValidator(string) {
  const safeRegexIsURLImage = new RegExp(
    /^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.))?$/
  );
  console.log("is safe regex = ", safe(safeRegexIsURLImage));
  return validator.matches(string, safeRegexIsURLImage);
}
 </pre>

<pre>
function stringContainsURLs(argumento) {
  if (typeof argumento !== "string") {
    console.log(
      "Error en val fn stringContainsURLs. El argumento no es un string."
    );
    throw new Error("The argument must be a string");
  }
  if (argumento.length > 800) {
    console.log(
      "Error en fn val stringContainsURLs: El argumento es demasiado largo."
    );
    throw new Error("El argumento es demasiado largo.");
  }
  let argTrimmed = argumento.trim();
  if (
    new RegExp(
      "([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?"
    ).test(argTrimmed)
  ) {
    return true;
  } else {
    return false;
  }
}
</pre>
