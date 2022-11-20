import { Router } from "express";
import { User } from "../mongoDB";
const router = Router();

router.get("/allUsers", async (req, res) => {
  try {
    let allUsersFromDB = await User.find();
    return res.status(200).send(allUsersFromDB);
  } catch (error: any) {
    return res.status(400).send({ error: error.message });
  }
});

export default router;
