import { setAllUsers } from "./userSlice";
import axios from "axios";
import { URL_ALL_USERS } from "../../../constants/url";
import { header } from "../../../constants/header";

export function allUsers(token) {
  return async function (dispatch) {
    try
    {
      let response = await axios.get(URL_ALL_USERS, header(token));
      return dispatch(setAllUsers(response.data));
    } catch (error)
    {
      return dispatch(setAllUsers({ error: error.response?.data?.error }));
    }
  };
}