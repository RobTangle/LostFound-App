import { Router, Request, Response } from "express";
import { User } from "../../mongoDB";
import { IUser } from "../../mongoDB/models/User";
import { validateNewUser } from "../../validators/user-validators";

const router = Router();

router.get("/allUsers", async (req: Request, res: Response) => {
  try {
    let allUsersFromDB = await User.find();
    return res.status(200).send(allUsersFromDB);
  } catch (error: any) {
    return res.status(400).send({ error: error.message });
  }
});

router.post("/newUser", async (req: Request, res: Response) => {
  try {
    console.log("REQ.BODY = ", req.body);
    // const _id = req.auth.sub
    const validatedNewUser: IUser = validateNewUser(req.body);
    const newUser = await User.create(validatedNewUser);

    return res.status(200).send(newUser);
  } catch (error: any) {
    console.log(`Error en POST '/newUser. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

export default router;
