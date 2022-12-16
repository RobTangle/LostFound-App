import { Router, Request, Response } from "express";
import {
  arrayOfArraysKeyValuesEN,
  arrayOfArraysKeyValuesES,
} from "../../miscellanea/CountiesArrays";
const router = Router();

// GET ARRAY OF COUNTRIES BY LANGUAGE :
router.get("/", (req: Request, res: Response) => {
  try {
    let lang = req.query.lang;
    if (lang === "en") {
      return res.status(200).send(arrayOfArraysKeyValuesEN);
    }
    if (lang === "es") {
      return res.status(200).send(arrayOfArraysKeyValuesES);
    }
    throw new Error("You must enter in the query a lang: 'es' or 'en'");
  } catch (error: any) {
    console.log(`Error en "/countries". ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

export default router;
