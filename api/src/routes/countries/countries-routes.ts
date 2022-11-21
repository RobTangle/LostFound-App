import { Router, Request, Response } from "express";
import {
  countryListESAlpha2,
  countryListENAlpha2,
} from "../../miscellanea/CountiesArrays";
const router = Router();

// GET ARRAY OF COUNTRIES BY LANGUAGE :
router.get("/", (req: Request, res: Response) => {
  try {
    let lang = req.query.lang;
    if (lang === "en") {
      return res.status(200).send(countryListENAlpha2);
    }
    if (lang === "es") {
      return res.status(200).send(countryListESAlpha2);
    }
  } catch (error: any) {
    console.log(`Error en "/countries". ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

export default router;
