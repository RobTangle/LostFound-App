import {
  setAllUsers,
  setCountries,
  setUserProfile,
  setIsUserRegistered,
  setRegisterUser,
} from "./userSlice";
import axios from "axios";
import {
  URL_ALL_USERS,
  URL_ALL_COUNTRIES,
  URL_U_G_USER_INFO,
  URL_U_G_EXISTS_IN_DB,
} from "../../../constants/url";
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
export function getUserInfo(token) {
  return async function (dispatch) {
    try {
      let response = await axios.get(URL_U_G_USER_INFO, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      return dispatch(setUserProfile(response.data));
    } catch (error) {
      console.log(error);
      return dispatch(setUserProfile({ error: error.response?.data?.error }));
    }
  };
}

export function registerUser(obj, token) {
  return async function (dispatch) {
    try {
      let response = await axios.post(
        URL_U_PO_REGISTER_NEW_USER,
        obj,
        header(token)
      );
      return dispatch(setRegisterUser(response.data));
    } catch (error) {
      return dispatch(setRegisterUser({ error: error.message }));
    }
  };
}

export function isUserRegistered(token) {
  return async function (dispatch) {
    try {
      let response = await axios.get(URL_U_G_EXISTS_IN_DB, header(token));
      return dispatch(setIsUserRegistered(response.data));
    } catch (error) {
      return dispatch(setIsUserRegistered({ error: error.message }));
    }
  };
}
