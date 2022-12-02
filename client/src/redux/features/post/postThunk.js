import { getSearch, postDocument } from "./postSlice";
import axios from "axios";
import {
  URL_P_G_SEARCH_BY_QUERY,
  URL_P_PO_NEW_POST,
} from "../../../constants/url";
import { header } from "../../../constants/header";

// export function allUsers(obj, token) {
//   return async function (dispatch) {
//     try {
//       let response = await axios.get(URL_ALL_USERS, header(token));
//       return dispatch(setAllUsers(response.data));
//     } catch (error) {
//       return dispatch(setAllUsers({ error: error.response?.data?.error }));
//     }
//   };
// }
export function createPost(post, token) {
  return async function (dispatch) {
    try {
      const response = await axios.post(URL_P_PO_NEW_POST, post, token);
      dispatch(postDocument(response.data, "Publicación creada correctamente"));
    } catch (error) {
      console.log(error.message);
      dispatch(postDocument("Ups, algo salió mal! Intente nuevamente."));
    }
  };
}

export function searchPost({ name, number, country, date_lost }, token) {
  return async function (dispatch) {
    try {
      let response = await axios.get(
        URL_P_G_SEARCH_BY_QUERY +
          `?name=${name}&number=${number}&country=${country}&date_lost=${date_lost}`,
        header(token)
      );
      return dispatch(getSearch(response.data));
    } catch (error) {
      return dispatch(getSearch({ error: error.response?.data?.error }));
    }
  };
}
