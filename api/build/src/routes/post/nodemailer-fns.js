"use strict";
// import nodemailer from "nodemailer";
// import { LeanDocument } from "mongoose";
// import { IUserPosting } from "../../mongoDB/models/Post";
// import { IUser } from "../../mongoDB/models/User";
// import validator from "validator";
// require("dotenv").config();
// const GMAIL_USER = process.env.GMAIL_USER;
// const GMAIL_PASS = process.env.GMAIL_PASS;
// // SEND CONTACT INFO TO BOTH USERS :
// export async function sendContactInfoEmailToBothUsers(
//   user_posting: IUserPosting,
//   user_contacting: LeanDocument<IUser & Required<{ _id: string }>>
// ) {
//   await sendContactInfoMailToUserContacting(user_posting, user_contacting);
//   await sendContactInfoMailToUserPosting(user_posting, user_contacting);
// }
// // SEND MAIL TO USER POSTING :
// async function sendContactInfoMailToUserPosting(
//   user_posting: IUserPosting,
//   user_contacting: { name: any; email: any }
// ) {
//   console.log(GMAIL_PASS, GMAIL_USER);
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: GMAIL_USER,
//       pass: GMAIL_PASS,
//     },
//   });
//   // const msgMail = `Hola, ${subscription.user_subscribed.name}! Tenes buenas noticias! Alguien ha posteado un nuevo anuncio que coincide con tu suscripción! Acá te dejamos el link a la publicación. Asegúrate de estar logueado con tu cuenta registrada para poder acceder. Mucha suerte!!!!  https://www.lostfound-app.com/found/${post_id}`;
//   const mailToUserPosting = {
//     from: "lostfound.app.info@gmail.com",
//     to: user_posting.email,
//     subject:
//       "Alguien quiere contactarse contigo por los documentos que publicaste en LostFound.",
//     html: `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta http-equiv="X-UA-Compatible" content="IE=edge">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <style>
//     p,
//     a,
//     h1,
//     h2,
//     h3,
//     h4,
//     h5,
//     h6 {
//       font-family: 'Roboto', sans-serif !important;
//     }
//     h1 {
//       font-size: 30px !important;
//     }
//     h2 {
//       font-size: 25px !important;
//     }
//     h3 {
//       font-size: 18px !important;
//     }
//     h4 {
//       font-size: 16px !important;
//     }
//     p,
//     a {
//       font-size: 15px !important;
//     }
//     .imag {
//       width: 20px;
//       height: 20px;
//     }
//     .contA {
//       margin: 0px 5px 0 5px;
//     }
//   </style>
// </head>
// <body>
//   <div style="width: 100%; background-color: #e3e3e3;">
//     <div style="padding: 20px 10px 20px 10px;">
//       <div style="background-color: #ffffff; padding: 20px 0px 5px 0px; width: 100%; text-align: center;">
//         <h1>¡Un posible dueño de la documentación que encontraste quiere contactarse contigo! 🙌🙌🙌</h1>
//         <p>¡Hola ${validator.escape(
//           user_posting.name
//         )}! Queremos avisarte que alguien quiere contactarte por la documentación que has encontrado. Le hemos enviado un email con tus datos de contacto, al igual que a tí te enviamos los datos de contacto del usuario que quiere comunicarse contigo. </p>
//         <p> Nombre: ${validator.escape(user_contacting.name)}</p>
//         <p> Email: ${validator.escape(user_contacting.email)}</p>
// </br>
//         Acá te brindamos unos consejos a tener en cuenta antes de entregarle los documentos a un tercero. ¡Asegúrate de leerlos!
//         <a href="https://lostfound.app/tips" target="_blank"> Tips a tener en cuenta </a>
//         <p style="margin-bottom: 50px;"><i>Atentamente:</i><br>El equipo de LostFound App❤️❤️❤️</p>
//       </div>
//       <!-- Contenido principal -->
//       <!-- Footer -->
//       <div
//         style="background-color: #282828; color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">
//         <!-- Redes sociales -->
//         <a href="https://github.com/robtangle/lostfound-app" class="contA">GitHub</a>
//         <a href="https://mascotapps.vercel.app/" class="contA">Mascotapp</a>
//       </div>
//     </div>
//   </div>
// </body>
// </html>`,
//   };
//   transporter.sendMail(mailToUserPosting, function (error: any, info): void {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Email enviado: " + info.response);
//     }
//   });
//   console.log(
//     `Función sendContactInfoMailToUserPosting ejecutada al email ${user_posting.email}.`
//   );
// }
// //* SEND EMAIL TO USER CONTACTING :
// async function sendContactInfoMailToUserContacting(
//   user_posting: IUserPosting,
//   user_contacting: LeanDocument<IUser & Required<{ _id: string }>>
// ): Promise<void> {
//   console.log(GMAIL_PASS, GMAIL_USER);
//   console.log(
//     "🚀 ~ file: post-r-auxiliary.ts:339 ~ user_contacting",
//     user_contacting
//   );
//   console.log("USER POSTING = ", user_posting);
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: GMAIL_USER,
//       pass: GMAIL_PASS,
//     },
//   });
//   let contactInfo = "-";
//   if (user_posting.additional_contact_info) {
//     contactInfo = validator.escape(user_posting.additional_contact_info);
//   }
//   const mailToUserPosting = {
//     from: "lostfound.app.info@gmail.com",
//     to: user_contacting.email,
//     subject:
//       "Acá está la información de contacto del publicitante del aviso en LostFound App.",
//     html: `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta http-equiv="X-UA-Compatible" content="IE=edge">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <style>
//     p,
//     a,
//     h1,
//     h2,
//     h3,
//     h4,
//     h5,
//     h6 {
//       font-family: 'Roboto', sans-serif !important;
//     }
//     h1 {
//       font-size: 30px !important;
//     }
//     h2 {
//       font-size: 25px !important;
//     }
//     h3 {
//       font-size: 18px !important;
//     }
//     h4 {
//       font-size: 16px !important;
//     }
//     p,
//     a {
//       font-size: 15px !important;
//     }
//     .imag {
//       width: 20px;
//       height: 20px;
//     }
//     .contA {
//       margin: 0px 5px 0 5px;
//     }
//   </style>
// </head>
// <body>
//   <div style="width: 100%; background-color: #e3e3e3;">
//     <div style="padding: 20px 10px 20px 10px;">
//       <div style="background-color: #ffffff; padding: 20px 0px 5px 0px; width: 100%; text-align: center;">
//         <h1>¡Información de contacto del usuario que encontró los documentos! 🙌🙌🙌</h1>
//         <p>¡Hola ${validator.escape(
//           user_contacting.name
//         )}! Acá te enviamos los datos de contactos que ha proporcionado el usuario que ha publicado los documentos por los que quieren contactar. Le hemos enviado un email con tus datos de contacto, al igual que a tí te enviamos los datos de contacto del usuario que quieres contactar. </p>
//         <p> Nombre: ${validator.escape(user_posting.name)}</p>
//         <p> Email: ${validator.escape(user_posting.email)}</p>
//         <p> Información de contacto adicional: ${contactInfo}</p>
// </br>
//         Acá te brindamos unos consejos a tener en cuenta. ¡Asegúrate de leerlos!
//         <a href="https://lostfound.app/tips" target="_blank"> Tips a tener en cuenta </a>
//         <p style="margin-bottom: 50px;"><i>Atentamente:</i><br>El equipo de LostFound App❤️❤️❤️</p>
//       </div>
//       <!-- Contenido principal -->
//       <!-- Footer -->
//       <div
//         style="background-color: #282828; color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">
//         <!-- Redes sociales -->
//         <a href="https://github.com/robtangle/lostfound-app" class="contA">GitHub</a>
//         <a href="https://mascotapps.vercel.app/" class="contA">Mascotapp</a>
//       </div>
//     </div>
//   </div>
// </body>
// </html>`,
//   };
//   transporter.sendMail(mailToUserPosting, function (error: any, info: any) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Email enviado: " + info.response);
//     }
//   });
//   console.log(
//     `Función sendContactInfoMailToUserContacting ejecutada al email ${user_contacting.email}.`
//   );
// }
