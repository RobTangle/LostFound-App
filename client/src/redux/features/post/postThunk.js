import { getSearch } from "./postSlice";
import axios from "axios";
import { URL_P_G_SEARCH_BY_QUERY } from "../../../constants/url";
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
export function searchPost({ name, number, country, date_lost }) {
  return async function (dispatch) {
    try {
      let response = await axios.get(
        URL_P_G_SEARCH_BY_QUERY +
          `?name=${name}&number=${number}&country=${country}&date_lost=${date_lost}`
      );
      return dispatch(getSearch(response.data));
    } catch (error) {
      return dispatch(getSearch({ error: error.response?.data?.error }));
    }
  };
}
