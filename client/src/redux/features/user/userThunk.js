import { setAllUsers, setCountries } from "./userSlice";
import axios from "axios";
import { URL_ALL_USERS, URL_ALL_COUNTRIES } from "../../../constants/url";
import { header } from "../../../constants/header";

export function allUsers(token) {
  return async function (dispatch) {
    try {
      let response = await axios.get(URL_ALL_USERS, header(token));
      return dispatch(setAllUsers(response.data));
    } catch (error) {
      return dispatch(setAllUsers({ error: error.response?.data?.error }));
    }
  };
}
export function getCountries(lang) {
  return async function (dispatch) {
    try {
      let response = await axios.get(URL_ALL_COUNTRIES + `?lang=${lang}`);
      return dispatch(setCountries(response.data));
    } catch (error) {
      return dispatch(setCountries({ error: error.response?.data?.error }));
    }
  };
}
