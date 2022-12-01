import { Request as JWTRequest } from "express-jwt";
import { Response } from "express";
import { Post } from "../../mongoDB";
import { IPost } from "../../mongoDB/models/Post";
import { validatePost } from "../../validators/post-validators";
import { handleAlertAfterNewPost } from "../subscription/nodemailer";
import {
  getUserByIdOrThrowError,
  throwErrorIfUserIsNotRegisteredOrVoid,
} from "../user/user-auxiliaries";
import {
  searchPostsByQuery,
  handleUpdatePost,
  findPostByIdAndDeleteIt,
} from "./post-r-auxiliary";

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
    const userInDB = await getUserByIdOrThrowError(userPostingId);

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
    let resultOfSendingAlerts = await handleAlertAfterNewPost(newPost);
    console.log(resultOfSendingAlerts);
  } catch (error: any) {
    console.log(`Error en POST '/newPost. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
}

// En el formulario del front, que hagan un chequeo de que las letras del nombre sean [a-zA-z-0-9-áéíóúÁÉÍÓÚÜüçÇñÑ] y que no se equivoquen de tilde con la invertida. Tenemos que pedir que el nombre sea idéntico a como figura en el documento.
// Ya que descartamos la importancia de las tarjetas de crédito y le damos más importanci a pasaportes y DNI, el nombres siempre va a figurar completo. Y las tarjetas de crédito, la persona debería denunciarlas inmediatamente.

// SEARCH POSTS BY QUERY :
export async function handleSearchByQueryRequest(
  req: JWTRequest,
  res: Response
) {
  try {
    console.log("REQ.QUERY = ", req.query);

    const user_id = req.auth?.sub;
    await throwErrorIfUserIsNotRegisteredOrVoid(user_id);
    const postsFound = await searchPostsByQuery(req.query);
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
    const updateResponse = await handleUpdatePost(post_id, req.body, user_id);

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
    await throwErrorIfUserIsNotRegisteredOrVoid(user_id);
    const post_id = req.params._id;
    const postFoundById = await Post.findById(post_id, {
      "user_posting.additional_contact_info": 0,
    })
      .lean()
      .exec();
    if (postFoundById === null) {
      return res
        .status(404)
        .send(`Post con id "${post_id}"  no encontrado en la base de datos.`);
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
    const deleteResults = await findPostByIdAndDeleteIt(post_id, user_id);
    return res.status(deleteResults.status).send(deleteResults);
  } catch (error: any) {
    console.log(`Error en ruta DELETE "post/:_id". ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
}
