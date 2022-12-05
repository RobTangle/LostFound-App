import { getSearch, postDocument } from "./postSlice";
import axios from "axios";
import {
  URL_P_G_SEARCH_BY_QUERY,
  URL_P_PO_NEW_POST,
} from "../../../constants/url";
import { header } from "../../../constants/header";
import Swal from "sweetalert2";


export function createPost(post, token) {
  return async function (dispatch) {
    try {
      const response = await axios.post(URL_P_PO_NEW_POST, post, token);
      response.status === 201
        ? Swal.fire({
            position: "center",
            icon: "success",
            title: "Publicación creada con éxito",
            showConfirmButton: false,
            timer: 1500,
          })
        : response.status >= 400 &&
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Ups, algo salió mal! Intente nuevamente.",
            showConfirmButton: false,
            timer: 1500,
          });
    } catch (error) {
      console.log(error.message);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Ups, algo salió mal! Intente nuevamente.",
        showConfirmButton: false,
        timer: 1500,
      });
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
