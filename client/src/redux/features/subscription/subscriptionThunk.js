import { setNewSubscription } from "./subscriptionSlice";
import axios from "axios";
import { URL_S_D_DELETE_SUB, URL_S_PO_NEW_SUB } from "../../../constants/url";
import { header } from "../../../constants/header";
import Swal from "sweetalert2";

export function createSubscription(obj, token) {
  return async function (dispatch) {
    try {
      const response = await axios.post(URL_S_PO_NEW_SUB, obj, header(token));
      console.log("reponse = ", response);
      response.status === 201
        ? Swal.fire({
            position: "center",
            icon: "success",
            title: "Suscripción creada con éxito",
            showConfirmButton: true,
            timer: 5000,
          })
        : null;
      return dispatch(setNewSubscription(response.data));
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Ups, algo salió mal: ${
          error?.response?.data?.error || error.message
        }`,
        showConfirmButton: true,
      });
      return dispatch(setNewSubscription({ error: error.message }));
    }
  };
}

export function deleteSubscription(subs_id, token) {
  return async function (dispatch) {
    try {
      const response = await axios.delete(
        URL_S_D_DELETE_SUB + subs_id,
        header(token)
      );
      response.status === 200
        ? Swal.fire({
            position: "center",
            icon: "success",
            title: "Suscripción eliminada.",
            showConfirmButton: true,
            timer: 5000,
          })
        : null;
    } catch (error) {
      Swal.fire({
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

// ESTA FN NO SE DEBERÍA USAR YA QUE LAS SUBSCRIPTIONES ESTÁN EMBEBIDAS EN EL USER PROFILE
// export function getAllUserSubscriptions(token) {
//   return async function (dispatch) {
//     try {
//       const response = await axios.get(URL_S_G_USER_SUBS, header(token));
//       return dispatch(setUserSubscriptions(response.data));
//     } catch (error) {
//       return dispatch(setUserSubscriptions({ error: error.message }));
//     }
//   };
// }
