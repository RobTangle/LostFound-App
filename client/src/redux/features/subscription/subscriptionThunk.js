import axios from "axios";
import {
  URL_S_D_DELETE_SUB,
  URL_S_PA_UPDATE_SUB,
  URL_S_PO_NEW_SUB,
} from "../../../constants/url";
import { header } from "../../../constants/header";
import Swal from "sweetalert2";
import { getUserInfo } from "../user/userThunk";

export function createSubscription(obj, token, setSuscription, t) {
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
          timerProgressBar: true,

          // toast: true,
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

export function deleteSubscription(subs_id, token, t) {
  return async function (dispatch) {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await axios.delete(
            URL_S_D_DELETE_SUB + subs_id,
            header(token)
          );
          if (response.status === 200) {
            Swal.fire({
              toast: true,
              title: t("swal.deletedSubscriptionTitle"),
              icon: "success",
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });
            // Swal.fire({
            //   position: "center",
            //   icon: "success",
            //   title: "Suscripción eliminada.",
            //   showConfirmButton: true,
            //   timer: 5000,
            //   timerProgressBar: true,
            // });
            // Si se elimina una suscripción, fetcheo los datos del usuario actualizados para que se actualice sólo el componente de suscripciones.
            // Swal.fire(
            //   "Deleted!",
            //   "Your subscription has been deleted.",
            //   "success"
            // );
          }
          return dispatch(getUserInfo(token));
        }
      });
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

export function editSubscription(obj, id, token, setSuscription, t) {
  return async function (dispatch) {
    try {
      const response = await axios.patch(
        URL_S_PA_UPDATE_SUB + `${id}`,
        obj,
        header(token)
      );
      console.log("reponse = ", response);
      if (response.status === 200) {
        Swal.fire({
          toast: true,
          title: t("swal.updatedSubscriptionTitle"),
          icon: "success",
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
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
