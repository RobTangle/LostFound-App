import { checkAndParseDate } from "../../validators/genericValidators";
import {
  checkAndParseNameOnDoc,
  checkAndParseNumberOnDoc,
} from "../../validators/post-validators";
import { Response } from "express";
import { Request as JWTRequest } from "express-jwt";
import { Post } from "../../mongoDB";
import { throwErrorIfUserIsNotRegisteredOrVoid } from "../user/user-auxiliaries";
import {
  TSort,
  parseReqQuery,
  setFilterObj,
  QueryResult,
} from "./pagination-aux";

// HANDLE PAGINATED POST RESULTS REQUEST :
export async function handlePaginatedPostResultsRequest(
  req: JWTRequest,
  res: Response
) {
  try {
    //chequeo si el usuario está registrado en la db, o tira error :
    throwErrorIfUserIsNotRegisteredOrVoid(req.auth?.sub);

    // setup inicial de paginado :
    let { pag, lim, sortBy } = req.query;
    let page = 1;
    let limit = 5;
    let sort: TSort = "desc";
    if (sortBy === "asc") {
      sort = sortBy;
    }
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

    // Parseo y validación de inputs :
    const queryParsedValues = parseReqQuery(req.query);
    let nameOnDocParsed = checkAndParseNameOnDoc(queryParsedValues.name);
    let numberOnDocParsed = checkAndParseNumberOnDoc(queryParsedValues.number);
    let countryParsed = queryParsedValues.country.toLowerCase();
    let verifiedDate = checkAndParseDate(queryParsedValues.date_lost);

    // [filter, projection, sort]  query objs :

    const filterObj = setFilterObj(
      nameOnDocParsed,
      numberOnDocParsed,
      countryParsed,
      verifiedDate
    );

    const projectionObj = {
      "user_posting.posts": 0,
      "user_posting.createdAt": 0,
      "user_posting.updatedAt": 0,
      "user_posting.additional_contact_info": 0,
    };

    const sortObj = {
      createdAt: sort,
    };

    // find in the db :
    const countTotal = await Post.find(filterObj).countDocuments().exec();
    const docsFound = await Post.find(filterObj, projectionObj)
      .sort(sortObj)
      .skip(startIndex)
      .limit(limit)
      .lean()
      .exec();

    // setup the response obj with the query results :
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
