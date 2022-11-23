import { Router, Request, Response } from "express";
import { Request as JWTRequest } from "express-jwt";
import { Post } from "../../mongoDB";
import { IPost } from "../../mongoDB/models/Post";
import { validatePost } from "../../validators/post-validators";
import { getUserByIdOrThrowError } from "../user/user-auxiliaries";
import { searchPostsByQuery } from "./post-r-auxiliary";

const router = Router();

router.get("/allPosts", async (req: Request, res: Response) => {
  try {
    const allPostsFromDB = await Post.find().lean();
    return res.status(200).send(allPostsFromDB);
  } catch (error: any) {
    console.log(`Error en ruta /allPosts. ${error.message}`);
  }
});

router.post("/newPost", async (req: JWTRequest, res: Response) => {
  try {
    console.log("REQ.BODY = ", req.body);
    let userPostingId = req.body._id;
    const userInDB = await getUserByIdOrThrowError(userPostingId);

    console.log("User In DB = ", userInDB);

    const newPostToValidate: IPost = {
      ...req.body,
      user_posting: userInDB,
    };
    const validatedPost = validatePost(newPostToValidate);
    const newPost = await Post.create(validatedPost);
    userInDB.posts.push(newPost._id);
    await userInDB.save();
    return res.status(200).send(newPost);
    // NO USAR "return" al responder, y continuar haciendo la búsqueda de suscriptions que coincidan con el post recién creado. La que coincida, mandar un email al usuario avisandole.
    // await findAndSendAlertsOfMatchingSubscriptionsOfNewPost(
    //   newPost: IPost
    // )
  } catch (error: any) {
    console.log(`Error en POST '/newPost. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

// En el formulario del front, que hagan un chequeo de que las letras del nombre sean [a-zA-z-0-9-áéíóúÁÉÍÓÚÜüçÇñÑ] y que no se equivoquen de tilde con la invertida. Tenemos que pedir que el nombre sea idéntico a como figura en el documento.
// Ya que descartamos la importancia de las tarjetas de crédito y le damos más importanci a pasaportes y DNI, el nombres siempre va a figurar completo. Y las tarjetas de crédito, la persona debería denunciarlas inmediatamente.

router.get("/search", async (req: Request, res: Response) => {
  try {
    //jwtCheck // const user_id = req.auth?.sub;
    // await throwErrorIfUserIsNotRegisteredOrVoid(user_id)
    const postsFound = await searchPostsByQuery(req.query);
    return res.status(200).send(postsFound);
  } catch (error: any) {
    console.log(`Error en GET "/". ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

router.get("/:_id", async (req: JWTRequest, res: Response) => {
  try {
    //jwtCheck // const user_id = req.auth?.sub;
    // await throwErrorIfUserIsNotRegisteredOrVoid(user_id)
    const post_id = req.params._id;
    const postFoundById = await Post.findById(post_id).lean();
    return res.status(200).send(postFoundById);
  } catch (error: any) {
    console.log(`Error en ruta "post/:_id. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

export default router;
