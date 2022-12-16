// import { LeanDocument } from "mongoose";
// import { ParsedQs } from "qs";
// import { IPost } from "../../mongoDB/models/Post";

// export type QueryResult = {
//   results: LeanDocument<IPost & Required<{ _id: string }>>[];
//   page: number;
//   limit: number;
//   totalPages: number;
//   totalResults: number;
// };
// export type TSort = "asc" | "desc";

// // PARSE REQ QUERY TYPEOF VALUES :
// export function parseReqQuery(reqQuery: ParsedQs): {
//   name: string;
//   number: string | undefined;
//   country: string;
//   date_lost: string;
// } {
//   let { name, number, country, date_lost } = reqQuery;
//   if (
//     typeof name !== "string" ||
//     typeof country !== "string" ||
//     typeof date_lost !== "string"
//   ) {
//     console.log("Algún valor por query no es string.");
//     throw new Error("Invalid query inputs");
//   }

//   if (typeof number === "string" && number.length) {
//     const queryParsed = {
//       name,
//       number,
//       country,
//       date_lost,
//     };
//     return queryParsed;
//   } else {
//     const queryParsed = {
//       name,
//       number: undefined,
//       country,
//       date_lost,
//     };
//     return queryParsed;
//   }
// }

// // Retorna un objeto para pasar como filtro, dependiendo de si el number es falso o no :
// export function setFilterObj(
//   name: string,
//   number: string | undefined,
//   country: string,
//   date: Date
// ) {
//   // si el number es falsy :
//   if (name && !number && country && date) {
//     const filterObjWithoutNumber = {
//       $and: [
//         { name_on_doc: { $eq: name } },
//         { country_found: { $eq: country } },
//         { date_found: { $gte: date } },
//       ],
//     };
//     return filterObjWithoutNumber;
//   }
//   // si ningún valor es falsy :
//   if (name && number && country && date) {
//     const filterObjWithNumber = {
//       $and: [
//         {
//           $or: [
//             { name_on_doc: { $eq: name } },
//             { number_on_doc: { $eq: number } },
//           ],
//         },
//         { country_found: { $eq: country } },
//         { date_found: { $gte: date } },
//       ],
//     };
//     return filterObjWithNumber;
//   }
//   throw new Error("Invalid inputs for filter");
// }
