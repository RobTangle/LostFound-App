import Swal from "sweetalert2";
import axios from "axios";
import {
  URL_U_PA_UPDATE_NAME,
  URL_U_PA_UPDATE_PROFILE_IMG,
} from "../../constants/url";
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

const editUserProfileImgMX = (dispatch, token) => {
  return Swal.mixin({
    title: "Select your new profile image",
    input: "file",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Submit",
    showLoaderOnConfirm: true,
    preConfirm: async (input) => {
      try {
        //cloudinary:
        const image = input;
        // console.log(typeof image);
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "sinEfectos");
        data.append("cloud_name", "dtfcydx7h");

        const cloudinaryResponse = await fetch(
          `https://api.cloudinary.com/v1_1/dtfcydx7h/image/upload`,
          { method: "POST", body: data }
        );
        const dataNew = await cloudinaryResponse.json();
        console.log(dataNew);
        //----
        const response = await axios.patch(
          URL_U_PA_UPDATE_PROFILE_IMG,
          { profile_img: dataNew.secure_url },
          header(token)
        );
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        dispatch(setUserProfile(response.data));
        return response?.data?.profile_img;
      } catch (error) {
        Swal.showValidationMessage(`Request failed: ${error}`);
      }
    },
    allowOutsideClick: () => !Swal.isLoading(),
  });
};

const mixins = {
  editUserNameMX,
  editUserNameMX2,
  editUserProfileImgMX,
};

export default mixins;
