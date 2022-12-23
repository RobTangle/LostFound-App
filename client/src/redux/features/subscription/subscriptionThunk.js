import axios from "axios";
import { URL_S_D_DELETE_SUB, URL_S_PO_NEW_SUB } from "../../../constants/url";
import { header } from "../../../constants/header";
import Swal from "sweetalert2";
import { getUserInfo } from "../user/userThunk";

export function createSubscription(obj, token, setSuscription) {
  return async function (dispatch) {
    try {
      const response = await axios.post(URL_S_PO_NEW_SUB, obj, header(token));
      console.log("reponse = ", response);
      if (response.status === 201) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Suscripción creada con éxito",
          showConfirmButton: true,
          timer: 5000,
        });
        setSuscription({
          name_on_doc: "",
          number_on_doc: "",
          country_lost: "",
          date_lost: "",
        });
      }

      // Si se crea una nueva suscripción, fetcheo los datos del usuario actualizados para que se re-renderice el componente de suscripciones automáticamente.
      return dispatch(getUserInfo(token));
    } catch (error) {
      console.log(error);
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

export function deleteSubscription(subs_id, token) {
  return async function (dispatch) {
    try {
      const response = await axios.delete(
        URL_S_D_DELETE_SUB + subs_id,
        header(token)
      );
      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Suscripción eliminada.",
          showConfirmButton: true,
          timer: 5000,
        });
        // Si se elimina una suscripción, fetcheo los datos del usuario actualizados para que se actualice sólo el componente de suscripciones.
        return dispatch(getUserInfo(token));
      }
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
