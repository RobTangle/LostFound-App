import { Post } from "../../mongoDB";
import { DateTime } from "luxon";

export async function searchPostsByQuery(
  queryFromReq: any
): Promise<
  import("mongoose").LeanDocument<
    { [x: string]: any } & Required<{ _id: unknown }>
  >[]
> {
  try {
    const { name, number, country, date_lost } = queryFromReq;
    // parseo el número del documento para sacarle los símbolos:
    let numberOnDocParsed;
    if (typeof number === "string") {
      numberOnDocParsed = number.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
    }

    // date_lost tiene que ser menor o igual que date_found para que matchee.
    // La parseo con DateTime para chequear si es una fecha válida y que salte un error si no lo es:
    let parsedToDateCorrectly;
    if (typeof date_lost === "string") {
      let dateLostParsed: any = DateTime.fromFormat(date_lost, "yyyy-MM-dd");
      if (dateLostParsed.invalid) {
        throw new Error(dateLostParsed.invalid?.explanation);
      }
      parsedToDateCorrectly = dateLostParsed.toJSDate();
    } else {
      throw new Error(
        `The date found must be a valid date string yyyy-MM-dd. Example: 2022-10-23`
      );
    }
    // mongoose automáticamente compara la fecha yyyy-MM-dd correctamente contra la ISO de la DB. Pero igualmente intento parsearla con Luxon para que chequee si es una fecha válida o no. Si no lo es, tirará error. Si lo es, aprovecho y la uso para la query, pero es lo mismo que usar la date yyyy-MM-dd que viene por query.
    // El name se compara automáticamente con un "iLike". No hace falta pasarla a minúscula.
    const postsFound = await Post.find(
      {
        $and: [
          {
            $or: [{ name_on_doc: name }, { number_on_doc: numberOnDocParsed }],
          },
          { country_found: country },
          { date_found: { $gte: parsedToDateCorrectly } },
        ],
      },
      {
        _id: 1,
        "user_posting.posts": 0,
        "user_posting.createdAt": 0,
        "user_posting.updatedAt": 0,
      }
    ).lean();
    return postsFound;
  } catch (error: any) {
    console.log(`Error en fn aux search Posts By Query`);
    throw new Error(error.message);
  }
}
