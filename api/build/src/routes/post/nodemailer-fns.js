"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendContactInfoEmailToBothUsers = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv").config();
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;
// SEND CONTACT INFO TO BOTH USERS :
function sendContactInfoEmailToBothUsers(user_posting, user_contacting) {
    return __awaiter(this, void 0, void 0, function* () {
        yield sendContactInfoMailToUserContacting(user_posting, user_contacting);
        yield sendContactInfoMailToUserPosting(user_posting, user_contacting);
    });
}
exports.sendContactInfoEmailToBothUsers = sendContactInfoEmailToBothUsers;
// SEND MAIL TO USER POSTING :
function sendContactInfoMailToUserPosting(user_posting, user_contacting) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(GMAIL_PASS, GMAIL_USER);
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: GMAIL_USER,
                pass: GMAIL_PASS,
            },
        });
        // const msgMail = `Hola, ${subscription.user_subscribed.name}! Tenes buenas noticias! Alguien ha posteado un nuevo anuncio que coincide con tu suscripción! Acá te dejamos el link a la publicación. Asegúrate de estar logueado con tu cuenta registrada para poder acceder. Mucha suerte!!!!  https://www.lostfound-app.com/found/${post_id}`;
        const mailToUserPosting = {
            from: "lostfound.app.info@gmail.com",
            to: user_posting.email,
            subject: "Alguien quiere contactarse contigo por los documentos que publicaste en LostFound.",
            html: `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <style>
    p,
    a,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: 'Roboto', sans-serif !important;
    }

    h1 {
      font-size: 30px !important;
    }

    h2 {
      font-size: 25px !important;
    }

    h3 {
      font-size: 18px !important;
    }

    h4 {
      font-size: 16px !important;
    }

    p,
    a {
      font-size: 15px !important;
    }

    .imag {
      width: 20px;
      height: 20px;
    }

    .contA {
      margin: 0px 5px 0 5px;
    }
  </style>
</head>

<body>
  <div style="width: 100%; background-color: #e3e3e3;">
    <div style="padding: 20px 10px 20px 10px;">

      <div style="background-color: #ffffff; padding: 20px 0px 5px 0px; width: 100%; text-align: center;">
        <h1>¡Un posible dueño de la documentación que encontraste quiere contactarse contigo! 🙌🙌🙌</h1>
        <p>¡Hola ${user_posting.name}! Queremos avisarte que alguien quiere contactarte por la documentación que has encontrado. Le hemos enviado un email con tus datos de contacto, al igual que a tí te enviamos los datos de contacto del usuario que quiere comunicarse contigo. </p>
        <p> Nombre: ${user_contacting.name}</p>
        <p> Email: ${user_contacting.email}</p>
</br>
        Acá te brindamos unos consejos a tener en cuenta antes de entregarle los documentos a un tercero. ¡Asegúrate de leerlos! 
        <a href="https://lostfound.app/tips" target="_blank"> Tips a tener en cuenta </a> 
        <p style="margin-bottom: 50px;"><i>Atentamente:</i><br>El equipo de LostFound App❤️❤️❤️</p>
      </div>
      <!-- Contenido principal -->

      <!-- Footer -->
      <div
        style="background-color: #282828; color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">
        <!-- Redes sociales -->
        <a href="https://github.com/robtangle/lostfound-app" class="contA">GitHub</a>
        <a href="https://mascotapps.vercel.app/" class="contA">Mascotapp</a>
      </div>
    </div>
  </div>
</body>

</html>`,
        };
        transporter.sendMail(mailToUserPosting, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Email enviado: " + info.response);
            }
        });
        console.log(`Función sendContactInfoMailToUserPosting ejecutada al email ${user_posting.email}.`);
    });
}
//* SEND EMAIL TO USER CONTACTING :
function sendContactInfoMailToUserContacting(user_posting, user_contacting) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(GMAIL_PASS, GMAIL_USER);
        console.log("🚀 ~ file: post-r-auxiliary.ts:339 ~ user_contacting", user_contacting);
        console.log("USER POSTING = ", user_posting);
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: GMAIL_USER,
                pass: GMAIL_PASS,
            },
        });
        const mailToUserPosting = {
            from: "lostfound.app.info@gmail.com",
            to: user_contacting.email,
            subject: "Acá está la información de contacto del publicitante del aviso en LostFound App.",
            html: `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <style>
    p,
    a,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: 'Roboto', sans-serif !important;
    }

    h1 {
      font-size: 30px !important;
    }

    h2 {
      font-size: 25px !important;
    }

    h3 {
      font-size: 18px !important;
    }

    h4 {
      font-size: 16px !important;
    }

    p,
    a {
      font-size: 15px !important;
    }

    .imag {
      width: 20px;
      height: 20px;
    }

    .contA {
      margin: 0px 5px 0 5px;
    }
  </style>
</head>

<body>
  <div style="width: 100%; background-color: #e3e3e3;">
    <div style="padding: 20px 10px 20px 10px;">

      <div style="background-color: #ffffff; padding: 20px 0px 5px 0px; width: 100%; text-align: center;">
        <h1>¡Información de contacto del usuario que encontró los documentos! 🙌🙌🙌</h1>
        <p>¡Hola ${user_contacting.name}! Acá te enviamos los datos de contactos que ha proporcionado el usuario que ha publicado los documentos por los que quieren contactar. Le hemos enviado un email con tus datos de contacto, al igual que a tí te enviamos los datos de contacto del usuario que quieres contactar. </p>
        <p> Nombre: ${user_posting.name}</p>
        <p> Email: ${user_posting.email}</p>
        <p> Información de contacto adicional: ${user_posting.additional_contact_info || "-"}</p>
</br>
        Acá te brindamos unos consejos a tener en cuenta. ¡Asegúrate de leerlos! 
        <a href="https://lostfound.app/tips" target="_blank"> Tips a tener en cuenta </a> 
        <p style="margin-bottom: 50px;"><i>Atentamente:</i><br>El equipo de LostFound App❤️❤️❤️</p>
      </div>
      <!-- Contenido principal -->

      <!-- Footer -->
      <div
        style="background-color: #282828; color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">
        <!-- Redes sociales -->
        <a href="https://github.com/robtangle/lostfound-app" class="contA">GitHub</a>
        <a href="https://mascotapps.vercel.app/" class="contA">Mascotapp</a>
      </div>
    </div>
  </div>
</body>

</html>`,
        };
        transporter.sendMail(mailToUserPosting, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Email enviado: " + info.response);
            }
        });
        console.log(`Función sendContactInfoMailToUserContacting ejecutada al email ${user_contacting.email}.`);
    });
}
