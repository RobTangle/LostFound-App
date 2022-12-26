import Swal from "sweetalert2";
import axios from "axios";
import { URL_U_PA_UPDATE_NAME } from "../../constants/url";
import { header } from "../../constants/header";
import { setUserProfile } from "../../redux/features/user/userSlice";

const editUserNameMX = (dispatch, token) => {
  return Swal.mixin({
    title: "Enter your new user name",
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Submit",
    showLoaderOnConfirm: true,
    preConfirm: async (input) => {
      try {
        const obj = { name: input };
        const response = await axios.patch(
          URL_U_PA_UPDATE_NAME,
          obj,
          header(token)
        );
        if (!response.status === 200) {
          throw new Error(response?.error?.message);
        }
        console.log("RESPONSE = ", response);
        dispatch(setUserProfile(response.data));
        return response.data.name;
      } catch (error) {
        Swal.showValidationMessage(`Request failed: ${error}`);
      }
    },
    allowOutsideClick: () => !Swal.isLoading(),
  });
};

const editUserNameMX2 = Swal.mixin({
  title: "Enter your new user name",
  input: "text",
  inputAttributes: {
    autocapitalize: "off",
  },
  showCancelButton: true,
  confirmButtonText: "Submit",
  showLoaderOnConfirm: true,
});

const mixins = {
  editUserNameMX,
  editUserNameMX2,
};

export default mixins;
