import { Post, User } from "../../mongoDB";
import { Document } from "mongoose";
import { IUser } from "../../mongoDB/models/User";
import {
  checkAndParseNameOnDoc,
  checkAndParseNumberOnDoc,
  validateUpdatePostData,
} from "../../validators/post-validators";
import { checkAndParseDate } from "../../validators/genericValidators";
import { LeanDocument } from "mongoose";
import { ParsedQs } from "qs";
import { IPost } from "../../mongoDB/models/Post";

// SEARCH POSTS BY QUERY (WITHOUT PAGINATION) :
export async function searchPostsByQuery(
  queryFromReq: any
): Promise<
  import("mongoose").LeanDocument<
    { [x: string]: any } & Required<{ _id: unknown }>
  >[]
> {
  try {
    const { name, number, country, date_lost } = queryFromReq;

    // Parseo de inputs:
    let nameOnDocParsed = checkAndParseNameOnDoc(name);
    console.log(nameOnDocParsed);

    let countryParsed = country.toLowerCase();
    console.log(countryParsed);

    let numberOnDocParsed = checkAndParseNumberOnDoc(number);
    console.log(numberOnDocParsed);

    // date_lost tiene que ser menor o igual que date_found para que matchee.
    // La parseo con DateTime para chequear si es una fecha válida y que salte un error si no lo es:
    let verifiedDate = checkAndParseDate(date_lost);
    console.log(verifiedDate);

    // mongoose automáticamente compara la fecha yyyy-MM-dd correctamente contra la ISO de la DB. Pero igualmente intento parsearla con Luxon para que chequee si es una fecha válida o no. Si no lo es, tirará error. Si lo es, aprovecho y la uso para la query, pero es lo mismo que usar la date yyyy-MM-dd que viene por query.

    const postsFound = await Post.find(
      {
        $and: [
          {
            $or: [
              { name_on_doc: { $eq: nameOnDocParsed } },
              { number_on_doc: { $eq: numberOnDocParsed } },
            ],
          },
          { country_found: { $eq: countryParsed } },
          { date_found: { $gte: verifiedDate } },
        ],
      },
      {
        _id: 1,
        "user_posting.posts": 0,
        "user_posting.createdAt": 0,
        "user_posting.updatedAt": 0,
        "user_posting.additional_contact_info": 0,
      }
    )
      .lean()
      .exec();
    return postsFound;
  } catch (error: any) {
    console.log(`Error en fn aux search Posts By Query`);
    throw new Error(error.message);
  }
}

// UPDATE A POST :
export async function handleUpdatePost(
  post_id: string | undefined,
  reqFromBody: any,
  user_id: string | undefined
) {
  if (!post_id || !user_id) {
    throw new Error(
      `El id de la publicación y el id del usuario deben ser válidos.`
    );
  }
  const validatedData = validateUpdatePostData(reqFromBody);
  const postInDB = await Post.findById(post_id).exec();
  const userInDB = await User.findById(user_id).exec();
  if (postInDB === null) {
    throw new Error(
      `Post con id "${post_id}" no fue encontrado en la base de datos.`
    );
  }
  if (userInDB === null) {
    throw new Error(
      `Usuario con id "${user_id} no fue encontrado en la base de datos.`
    );
  }
  if (postInDB.user_posting._id !== userInDB._id) {
    throw new Error(
      `El id del post no pertenece al usuario que desea modificarlo.`
    );
  }

  let response = {
    userPost: 0,
    postCollection: 0,
    total: 0,
    msg: "",
    status: 200,
  };

  try {
    // editar en collection Post:
    postInDB.name_on_doc = validatedData.name_on_doc;
    postInDB.number_on_doc = validatedData.number_on_doc;
    postInDB.country_found = validatedData.country_found;
    postInDB.date_found = validatedData.date_found;
    postInDB.blurred_imgs = validatedData.blurred_imgs;
    postInDB.comments = validatedData.comments;
    postInDB.user_posting.additional_contact_info =
      validatedData.additional_contact_info;
    await postInDB.save();
    response.postCollection++;
    response.total++;
    // editar en User.posts:
    let userPost = userInDB.posts.id(post_id);
    if (userPost) {
      userPost.name_on_doc = validatedData.name_on_doc;
      userPost.number_on_doc = validatedData.number_on_doc;
      userPost.country_found = validatedData.country_found;
      userPost.date_found = validatedData.date_found;
      userPost.blurred_imgs = validatedData.blurred_imgs;
      userPost.comments = validatedData.comments;
      userPost.user_posting.additional_contact_info =
        validatedData.additional_contact_info;
      await userInDB.save();
      response.userPost++;
      response.total++;
    }
  } catch (error: any) {
    response.msg = error.message;
    response.status = 400;
  } finally {
    return response;
  }
}

// DELETE POST :
export async function findPostByIdAndDeleteIt(
  post_id: string | undefined,
  user_id: string | undefined
) {
  if (!post_id || !user_id) {
    throw new Error(`El id del Post y el id del usuario deben ser válidos.`);
  }
  //borrar post en el user_posts y en collection Post
  const userInDB = await User.findById(user_id).exec();
  const postInDB = await Post.findById(post_id).exec();

  if (userInDB === null) {
    throw new Error(
      `Usuario con id "${user_id}" no encontrado en la base de datos.`
    );
  }
  if (postInDB === null) {
    throw new Error(
      `Post con id "${post_id}" no encontrado en la base de datos.`
    );
  }

  if (postInDB.user_posting._id !== userInDB._id) {
    throw new Error(
      `El post que se quiere eliminar no pertenece al usuario con id "${user_id}"`
    );
  }

  let response = {
    userPosts: 0,
    postCollection: 0,
    total: 0,
    msg: "",
    status: 200,
  };

  try {
    // buscar y borrar post de User.posts:
    let doc = userInDB.posts.id(post_id);
    if (doc) {
      doc.remove();
      await userInDB.save();
      response.userPosts++;
      response.total++;
    } else {
      console.log(
        `Documento con ${post_id} no encontrado adentro del arreglo posts del usuario.`
      );
    }
    // buscar y borrar documento en collection Post:
    const deletedPost = await Post.findByIdAndDelete(post_id).exec();
    if (deletedPost) {
      response.postCollection++;
      response.total++;
    }
  } catch (error: any) {
    response.status = 400;
    response.msg = error.message;
  } finally {
    return response;
  }
}

// CHECK CONTACTS DATE :
export function checkContactsDate(user_contacting: IUser) {
  if (
    Array.isArray(user_contacting.contacts) &&
    user_contacting.contacts.length >= 5
  ) {
    // check date of the oldest contact: Si tiene más de 24hs, le permito. Si el último tiene menos de 24hs, tiro error:
    let dateNow = Date.now();
    let oldestContact = user_contacting.contacts[0];
    let timeFromOldestContact = dateNow - oldestContact;

    if (timeFromOldestContact <= 86400000) {
      throw new Error(`Too many contacts in the last 24hs.`);
    }
  }
}

// ADD CONTACT "TIMESTAMP" TO USER CONTACTING :
export async function addContactDateToUserContacting(
  user_contacting: Document<unknown, any, IUser> &
    IUser &
    Required<{ _id: string }>
) {
  if (
    Array.isArray(user_contacting.contacts) &&
    user_contacting.contacts.length >= 5
  ) {
    user_contacting.contacts.shift();
    user_contacting.contacts.push(Date.now());
    await user_contacting.save();
    console.log("Contact shifteado y pusheado");
  } else {
    if (
      Array.isArray(user_contacting.contacts) &&
      user_contacting.contacts.length < 5
    ) {
      user_contacting.contacts.push(Date.now());
      await user_contacting.save();
      console.log("Contact pusheado");
    }
  }
}

export type QueryResult = {
  results: LeanDocument<IPost & Required<{ _id: string }>>[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
};
export type TSort = "asc" | "desc";

// PARSE REQ QUERY TYPEOF VALUES :
export function parseReqQuery(reqQuery: ParsedQs): {
  name: string;
  number: string | undefined;
  country: string;
  date_lost: string;
} {
  let { name, number, country, date_lost } = reqQuery;
  if (
    typeof name !== "string" ||
    typeof country !== "string" ||
    typeof date_lost !== "string"
  ) {
    console.log("Algún valor por query no es string.");
    throw new Error("Invalid query inputs");
  }

  if (typeof number === "string" && number.length) {
    const queryParsed = {
      name,
      number,
      country,
      date_lost,
    };
    return queryParsed;
  } else {
    const queryParsed = {
      name,
      number: undefined,
      country,
      date_lost,
    };
    return queryParsed;
  }
}

// Retorna un objeto para pasar como filtro, dependiendo de si el number es falso o no :
export function setFilterObj(
  name: string,
  number: string | undefined,
  country: string,
  date: Date
) {
  // si el number es falsy :
  if (name && !number && country && date) {
    const filterObjWithoutNumber = {
      $and: [
        { name_on_doc: { $eq: name } },
        { country_found: { $eq: country } },
        { date_found: { $gte: date } },
      ],
    };
    return filterObjWithoutNumber;
  }
  // si ningún valor es falsy :
  if (name && number && country && date) {
    const filterObjWithNumber = {
      $and: [
        {
          $or: [
            { name_on_doc: { $eq: name } },
            { number_on_doc: { $eq: number } },
          ],
        },
        { country_found: { $eq: country } },
        { date_found: { $gte: date } },
      ],
    };
    return filterObjWithNumber;
  }
  throw new Error("Invalid inputs for filter");
}

const postServices = {
  searchPostsByQuery,
  handleUpdatePost,
  findPostByIdAndDeleteIt,
  checkContactsDate,
  addContactDateToUserContacting,
  parseReqQuery,
  setFilterObj,
};

export default postServices;
