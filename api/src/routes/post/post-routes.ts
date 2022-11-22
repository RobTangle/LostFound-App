import { Router, Request, Response } from "express";
import { Request as JWTRequest } from "express-jwt";
import { Post, User } from "../../mongoDB";
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
    let userPostingId = "00000001primerUserID";
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
  } catch (error: any) {
    console.log(`Error en POST '/newPost. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

// En el formulario del front, que hagan un chequeo de que las letras del nombre sean [a-zA-z-0-9-áéíóúÁÉÍÓÚÜüçÇñÑ] y que no se equivoquen de tilde con la invertida. Tenemos que pedir que el nombre sea idéntico a como figura en el documento.
// Ya que descartamos la importancia de las tarjetas de crédito y le damos más importanci a pasaportes y DNI, el nombres siempre va a figurar completo. Y las tarjetas de crédito, la persona debería denunciarlas inmediatamente.

router.get("/", async (req: Request, res: Response) => {
  try {
    // Agarro el req.auth.sub y busco si el usuario está verificado para autorizarlo a hacer la búsqueda:
    // if (!req.auth?.verified) throw new Error (`The user account must be verified.`);
    const postsFound = await searchPostsByQuery(req.query);
    return res.status(200).send(postsFound);
  } catch (error: any) {
    console.log(`Error en GET "/". ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

export default router;
