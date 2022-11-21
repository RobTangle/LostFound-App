import { Router, Request, Response } from "express";
import { Post, User } from "../../mongoDB";
import { IPost } from "../../mongoDB/models/Post";
import { validatePost } from "../../validators/post-validators";

const router = Router();

router.get("/allPosts", async (req: Request, res: Response) => {
  try {
    const allPostsFromDB = await Post.find();
    return res.status(200).send(allPostsFromDB);
  } catch (error: any) {
    console.log(`Error en ruta /allPosts. ${error.message}`);
  }
});

router.post("/newPost", async (req: Request, res: Response) => {
  try {
    console.log("REQ.BODY = ", req.body);
    let userPostingId = "00000001primerUserID";
    const userInDB = await User.findById(userPostingId);
    console.log("User In DB = ", userInDB);

    const newPostToValidate: IPost = {
      ...req.body,
      user_posting: userInDB,
    };
    const validatedPost = validatePost(newPostToValidate);
    const newPost = await Post.create(validatedPost);

    if (!newPost) {
      throw new Error("Lo siendo. Hubo un error y no se creó el aviso.");
    }
    return res.status(200).send(newPost);
  } catch (error: any) {
    console.log(`Error en POST '/newPost. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

export default router;
