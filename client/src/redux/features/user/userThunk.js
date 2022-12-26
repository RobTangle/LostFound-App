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
  URL_U_PA_UPDATE_PROFILE_IMG,
  URL_U_PA_UPDATE_NAME,
} from "../../../constants/url";
import { header } from "../../../constants/header";
import Swal from "sweetalert2";
import mixins from "../../../helpers/Swals/Mixins";

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

export function editUserProfileImg(obj, token) {
  return async function (dispatch) {
    try {
      const response = await axios.patch(
        URL_U_PA_UPDATE_PROFILE_IMG,
        obj,
        header(token)
      );
      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Profile image updated",
          showConfirmButton: true,
          timer: 5000,
          timerProgressBar: true,
        });
      }
      dispatch(setUserProfile(response.data));
    } catch (error) {
      return Swal.fire({
        position: "center",
        icon: "error",
        title: `Ups, algo salió mal: ${
          error?.response?.data?.error || error.message
        }`,
        showConfirmButton: true,
      });
    }
  };
}

export function editUserName(obj, token) {
  return async function (dispatch) {
    try {
      const response = await axios.patch(
        URL_U_PA_UPDATE_NAME,
        obj,
        header(token)
      );
      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Nombre actualizado",
          showConfirmButton: true,
          timer: 5000,
          timerProgressBar: true,
        });
      }
      // actualizo el userProfile con el usuario actualizado que me response la request:
      dispatch(setUserProfile(response.data));
    } catch (error) {
      return Swal.fire({
        position: "center",
        icon: "error",
        title: `Ups, algo salió mal: ${
          error?.response?.data?.error || error.message
        }`,
        showConfirmButton: true,
      });
    }
  };
}

export function editUserNameWithSwal(token) {
  console.log("en editusernamewithswal");
  return async function (dispatch) {
    try {
      console.log("editUserNameWithSwal fired");
      // mixins.editUserNameMX2
      //   .fire({
      //     preConfirm: async (input) => {
      //       try {
      //         const obj = { name: input };
      //         const response = await axios.patch(
      //           URL_U_PA_UPDATE_NAME,
      //           obj,
      //           header(token)
      //         );
      //         if (!response.status === 200) {
      //           throw new Error(response?.error?.message);
      //         }
      //         console.log("RESPONSE = ", response);
      //         dispatch(setUserProfile(response.data));
      //         return response.data.name;
      //       } catch (error) {
      //         Swal.showValidationMessage(`Request failed: ${error}`);
      //       }
      //     },
      //     allowOutsideClick: () => !Swal.isLoading(),
      //   })
      mixins
        .editUserNameMX(dispatch, token)
        .fire()
        .then((result) => {
          console.log("RESULT = ", result);
          if (result.isConfirmed) {
            Swal.fire({
              title: `${result.value} is your new user name.`,
              icon: "success",
            });
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };
}
