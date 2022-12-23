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
exports.alertUsersAfterNewPost = void 0;
const mongoDB_1 = require("../../mongoDB");
const validator_1 = __importDefault(require("validator"));
require("dotenv").config();
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;
const nodemailer = require("nodemailer");
//* Lógica del funcionamiento del sistema de suscripciones y alertas por email:
// Un usuario que perdió documentos va a crear una "Subscription" con ciertos key-values que representan ciertos datos referida a la documentación perdida. Esta Subscription va a esperar a que un nuevo post coincida con sus key-values.
// 1) Luego de que se crea un nuevo post, se va a invocar a la función handleAlertAfterNewPost(newPost) y se le va a pasar como argumento el post recién creado en la ruta.
// 2) Al invocarse la función handleAlertAfterNewPost, va a ocurrir lo siguiente:
// - Primero, por medio de la fn findMatchingSuscriptionsToNewPost, se van a buscar las suscripciones que matcheen con el post recién creado, y va a retornar un arreglo con los matches.
// - Segundo, ese arreglo de los matches se los va a pasar como argumento a la fn alertMatchingSubscriptions, la cual va a iterar el arreglo...
// (Tercero),  y por cada elemento (subscription) iterado se va a invocar a la fn sendMailWithNodeMailer la cual va a enviar un email al {subscription.user_subscribed.email} invocando a la función interna transporter.sendMail.
// HANDLE ALERT AFTER NEW POST :
function alertUsersAfterNewPost(newPost) {
    return __awaiter(this, void 0, void 0, function* () {
        const matchingSubscriptions = yield findMatchingSuscriptionsToNewPost(newPost);
        const alertedMatchingSubs = yield alertMatchingSubscriptions(matchingSubscriptions, newPost._id);
        return alertedMatchingSubs;
    });
}
exports.alertUsersAfterNewPost = alertUsersAfterNewPost;
// FIND MATCHING SUSCRIPTIONS :
function findMatchingSuscriptionsToNewPost(newPost) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name_on_doc, number_on_doc, country_found, date_found } = newPost;
            // parseos y validaciones:
            // numberOnDoc, le saco los símbolos:
            let numberOnDocParsed;
            if (typeof number_on_doc === "string") {
                numberOnDocParsed = number_on_doc
                    .replace(/[^A-Za-z0-9]/g, "")
                    .toLowerCase();
            }
            // date_found: No necesito parsearla porque ya vino parseada por haber sido recién creada.
            const filters = {
                $and: [
                    {
                        $or: [
                            { name_on_doc: name_on_doc },
                            { number_on_doc: numberOnDocParsed },
                        ],
                    },
                    { country_lost: country_found },
                    { date_lost: { $lte: date_found } },
                ],
            };
            const findMatchingSubscriptions = yield mongoDB_1.Subscription.find(filters, {
                _id: 1,
                "user_subscribed._id": 1,
                "user_subscribed.name": 1,
                "user_subscribed.email": 1,
            }).lean();
            return findMatchingSubscriptions;
        }
        catch (error) {
            console.log(`Error en fn findMatchingSuscriptions. ${error.message}`);
            return [];
        }
    });
}
// ALERT MATCHING SUBSCRIPTIONS :
function alertMatchingSubscriptions(arrayOfMatchingSubscriptions, post_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Cantidad de matching subscriptions: ", arrayOfMatchingSubscriptions.length);
            let emailsSentCount = 0;
            for (let i = 0; i < arrayOfMatchingSubscriptions.length; i++) {
                const element = arrayOfMatchingSubscriptions[i];
                yield sendMailWithNodeMailer(element, post_id);
                emailsSentCount++;
            }
            console.log(`Cantidad de emails enviados = ${emailsSentCount}`);
            return emailsSentCount;
        }
        catch (error) {
            console.log(`Error en fn alertMatchingSubscriptions. ${error.message}`);
        }
    });
}
// SEND MAIL WITH NODE MAILER :
function sendMailWithNodeMailer(subscription, post_id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(GMAIL_PASS, GMAIL_USER);
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: GMAIL_USER,
                pass: GMAIL_PASS,
            },
        });
        if (!post_id) {
            console.log("Error en sendMailWithNodeMailer. El post_id es falsy.");
            throw new Error("Invalid post id");
        }
        const post_idString = post_id.toString();
        const msgMail = `Hola, ${subscription.user_subscribed.name}! Tenes buenas noticias! Alguien ha posteado un nuevo anuncio que coincide con tu suscripción! Acá te dejamos el link a la publicación. Asegúrate de estar logueado con tu cuenta registrada para poder acceder. Mucha suerte!!!!  https://www.lostfound-app.com/found/${post_id}`;
        const mailOptions = {
            from: "lostfound.app.info@gmail.com",
            to: subscription.user_subscribed.email,
            subject: "¡Buenas noticias! Alguien ha encontrado un documento que podría el que estás buscando.",
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
        <h1>¡Se ha publicado documentación perdida que podría ser tuya! 🙌🙌🙌</h1>
        <p>¡Hola ${validator_1.default.escape(subscription.user_subscribed.name)}! Queremos avisarte que se ha publicado documentación perdida que podría ser la que estás buscando.
        Te dejamos un link para que la veas. Asegúrate de estar logueado con tu cuenta registrada de LostFound para poder verla. ¡Buena suerte!
        <a href="https://www.lostfound.app/found/${validator_1.default.escape(post_idString)} target="_blank">Ir a la publicación </a> </p>
</br>
        Acá te brindamos unos consejos a tener en cuenta para la recuperación de tus documentos. ¡Asegúrate de leerla! 
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
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Email enviado: " + info.response);
            }
        });
        console.log(`Función sendEmailWithNodeMailer ejecutada al email ${subscription.user_subscribed.email}.`);
    });
}
