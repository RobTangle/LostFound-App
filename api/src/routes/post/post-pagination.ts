//! PAGINATION : --------------------------------
import mongoose, { Document, LeanDocument } from "mongoose";
import { checkAndParseDate } from "../../validators/genericValidators";
import {
  checkAndParseNameOnDoc,
  checkAndParseNumberOnDoc,
} from "../../validators/post-validators";
import { ParsedQs } from "qs";
import { Request, Response } from "express";
import { Post } from "../../mongoDB";
import { IPost } from "../../mongoDB/models/Post";
/**
 * @typedef {Object} QueryResult
 * @property {Document[]} results - Results found
 * @property {number} page - Current page
 * @property {number} limit - Maximum number of results per page
 * @property {number} totalPages - Total number of pages
 * @property {number} totalResults - Total number of documents
 */
/**
 * Query for documents with pagination
 * @param {Object} [filter] - Mongo filter
 * @param {Object} [options] - Query options
 * @param {string} [options.sortBy] - Sorting criteria using the format: sortField:(desc|asc). Multiple sorting criteria should be separated by commas (,)
 * @param {string} [options.populate] - Populate data fields. Hierarchy of fields should be separated by (.). Multiple populating criteria should be separated by commas (,)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

type QueryResult = {
  results: LeanDocument<IPost & Required<{ _id: string }>>[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
};

// Hacer función que recibe como argumentos (model, filter, options).
// filter: sería lo que paso en la ruta que hago un search por query.
// options:  sería el :  sortby, limit, page
//  retorno un objeto queryResult.

export async function handlePaginatedPostResultsRequest(
  req: Request,
  res: Response
) {
  try {
    let { pag, lim } = req.query;
    console.log(req.query);

    let page = 1;
    let limit = 5;
    if (typeof pag === "string") {
      page = parseInt(pag) || 1;
    }
    if (typeof lim === "string") {
      limit = parseInt(lim) || 5;
    }

    let startIndex = (page - 1) * limit || 0;
    if (startIndex < 0) {
      startIndex = 0;
    }

    //! query / filter:

    const queryParsedValues = parseReqQuery(req.query);

    // Parseo de inputs:
    let nameOnDocParsed = checkAndParseNameOnDoc(queryParsedValues.name);
    let countryParsed = queryParsedValues.country.toLowerCase();
    let numberOnDocParsed = checkAndParseNumberOnDoc(queryParsedValues.number);
    let verifiedDate = checkAndParseDate(queryParsedValues.date_lost);

    const filterObj = {
      $and: [
        {
          $or: [
            { name_on_doc: { $eq: nameOnDocParsed } },
            { number_on_doc: { $eq: numberOnDocParsed } },
          ],
        },
        { country_found: { $eq: countryParsed } },
        { date_found: { $gte: verifiedDate } },
      ],
    };

    const projectionObj = {
      "user_posting.posts": 0,
      "user_posting.createdAt": 0,
      "user_posting.updatedAt": 0,
      "user_posting.additional_contact_info": 0,
    };
    const allTheDocs = {};
    const countTotal = await Post.find(filterObj).countDocuments().exec();
    const docsFound = await Post.find(filterObj, projectionObj)
      .skip(startIndex)
      .limit(limit)
      .lean()
      .exec();

    //! ---------------

    const results: QueryResult = {
      results: docsFound,
      page,
      limit,
      totalPages: Math.ceil(countTotal / limit),
      totalResults: countTotal,
    };
    return res.status(200).send(results);
  } catch (error: any) {
    console.log(`Error en paginado. ${error.message}`);
    return res.status(400).send({ error: "Something went wrong :( " });
  }
}

// PARSE REQ QUERY TYPEOF VALUES :
function parseReqQuery(reqQuery: ParsedQs): {
  name: string;
  number: string | undefined;
  country: string;
  date_lost: string;
} {
  let { name, number, country, date_lost } = reqQuery;
  if (
    typeof name !== "string" ||
    typeof country !== "string" ||
    typeof date_lost !== "string"
  ) {
    console.log("Algún valor por query no es string.");
    throw new Error("Invalid query inputs");
  }

  if (typeof number === "string" && number.length) {
    const queryParsed = {
      name,
      number,
      country,
      date_lost,
    };
    return queryParsed;
  } else {
    const queryParsed = {
      name,
      number: Math.random() + "",
      country,
      date_lost,
    };
    return queryParsed;
  }
}
