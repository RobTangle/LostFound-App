import { Request as JWTRequest } from "express-jwt";
import { Response } from "express";
import { Post, User } from "../../mongoDB";
import { IPost } from "../../mongoDB/models/Post";
import {
  checkAndParseNameOnDoc,
  checkAndParseNumberOnDoc,
  validatePost,
} from "../../validators/post-validators";
import {
  parseReqQuery,
  QueryResult,
  setFilterObj,
  TSort,
} from "../../services/post";
import { checkAndParseDate } from "../../validators/genericValidators";
import userServices from "../../services/user";
import postServices from "../../services/post";
import nmPostServices from "../../services/nodemailer/send-contact-info-to-users";
import nmSubscriptionServices from "../../services/nodemailer/alert-after-new-post";

export async function findAllPostsResponse(req: JWTRequest, res: Response) {
  try {
    const allPostsFromDB = await Post.find().lean().exec();
    return res.status(200).send(allPostsFromDB);
  } catch (error: any) {
    console.log(`Error en ruta /allPosts. ${error.message}`);
  }
}

// CREATE A NEW POST :
export async function handleNewPostRequest(req: JWTRequest, res: Response) {
  try {
    console.log("REQ.BODY = ", req.body);
    let userPostingId = req.auth?.sub;
    const userInDB = await userServices.getUserByIdOrThrowError(userPostingId);

    console.log("User In DB = ", userInDB);

    const newPostToValidate: IPost = {
      ...req.body,
      user_posting: userInDB,
    };
    const validatedPost = validatePost(newPostToValidate);
    const newPost = await Post.create(validatedPost);
    userInDB.posts.push(newPost);
    await userInDB.save();
    res.status(201).send(newPost);
    // CHEQUEO DE SUBSCRIPTIONS CON EL NEW POST:
    let resultOfSendingAlerts =
      await nmSubscriptionServices.handleAlertAfterNewPost(newPost);
    console.log(resultOfSendingAlerts);
  } catch (error: any) {
    console.log(`Error en POST '/newPost. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
}

// SEARCH POSTS BY QUERY :
export async function handleSearchByQueryRequest(
  req: JWTRequest,
  res: Response
) {
  try {
    console.log("REQ.QUERY = ", req.query);

    const user_id = req.auth?.sub;
    await userServices.throwErrorIfUserIsNotRegisteredOrVoid(user_id);
    const postsFound = await postServices.searchPostsByQuery(req.query);
    console.log("postsFound.length = ", postsFound.length);

    return res.status(200).send(postsFound);
  } catch (error: any) {
    console.log(`Error en GET "/". ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
}

// UPDATE A POST :
export async function handleUpdateRequest(req: JWTRequest, res: Response) {
  try {
    const user_id = req.auth?.sub;
    const post_id = req.params._id;
    if (!post_id || !user_id) {
      throw new Error(
        `El id de la publicación y el id del usuario deben ser válidos.`
      );
    }
    const updateResponse = await postServices.handleUpdatePost(
      post_id,
      req.body,
      user_id
    );

    return res.status(updateResponse.status).send(updateResponse);
  } catch (error: any) {
    console.log(`Error en ruta PUT "/post/:_id. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
}

// GET POST BY POST_ID IN PARAMS :
export async function handleGetPostByIdRequest(req: JWTRequest, res: Response) {
  try {
    const user_id = req.auth?.sub;
    await userServices.throwErrorIfUserIsNotRegisteredOrVoid(user_id);
    const post_id = req.params._id;
    const postFoundById = await Post.findById(post_id, {
      "user_posting.additional_contact_info": 0,
    })
      .lean()
      .exec();
    if (postFoundById === null) {
      return res
        .status(404)
        .send(
          "Post con id '" +
            encodeURI(post_id) +
            "' no encontrado en la base de datos."
        );
    }
    return res.status(200).send(postFoundById);
  } catch (error: any) {
    console.log(`Error en ruta GET "post/:_id. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
}

// DELETE POST BY POST_ID IN PARAMS :
export async function handleDeletePostRequest(req: JWTRequest, res: Response) {
  try {
    const user_id = req.auth?.sub;
    const post_id = req.params._id;
    if (!post_id || !user_id) {
      throw new Error(
        `El id de la publicación y el id del usuario deben ser válidos.`
      );
    }
    const deleteResults = await postServices.findPostByIdAndDeleteIt(
      post_id,
      user_id
    );
    return res.status(deleteResults.status).send(deleteResults);
  } catch (error: any) {
    console.log(`Error en ruta DELETE "post/:_id". ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
}

// CONTACT USER :
export async function handleContactUserRequest(req: JWTRequest, res: Response) {
  try {
    const user_id = req.auth?.sub;
    const post_id = req.params.post_id;

    const user_contacting = await User.findById(user_id).exec();
    if (!user_contacting) {
      throw new Error("Usuario no encontrado en la base de datos.");
    }

    const userInDBPosting = await Post.findById(post_id, {
      user_posting: 1,
      _id: 0,
    })
      .lean()
      .exec();
    if (!userInDBPosting) {
      throw new Error("No se han encontrado los datos del creador del aviso.");
    }
    const user_posting = userInDBPosting.user_posting;
    // Chequear si excedió los 5 contactos en las últimas 24hs. throw Error || void :
    postServices.checkContactsDate(user_contacting);
    await nmPostServices.sendContactInfoEmailToBothUsers(
      user_posting,
      user_contacting
    );

    res.status(202).send({ msg: "Processing request. Check your email." });
    // add new contact to user_contacting_contacts:
    postServices.addContactDateToUserContacting(user_contacting).then(
      function (succ) {
        console.log("addContactDateToUserContacting: OK");
      },
      function (error) {
        console.log("addContactDateToUserContacting: ERROR = ", error);
      }
    );
  } catch (error: any) {
    console.log(`Error en ruta POST "contact/:_id". ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
}

// HANDLE PAGINATED POST RESULTS REQUEST :
export async function handlePaginatedPostResultsRequest(
  req: JWTRequest,
  res: Response
) {
  try {
    //chequeo si el usuario está registrado en la db, o tira error :
    userServices.throwErrorIfUserIsNotRegisteredOrVoid(req.auth?.sub);

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

const postControllers = {
  findAllPostsResponse,
  handleNewPostRequest,
  handleSearchByQueryRequest,
  handleUpdateRequest,
  handleGetPostByIdRequest,
  handleDeletePostRequest,
  handleContactUserRequest,
  handlePaginatedPostResultsRequest,
};

export default postControllers;
