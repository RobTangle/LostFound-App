import { getSearch } from "./postSlice";
import axios from "axios";
import { URL_SEARCH } from "../../../constants/url";
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
