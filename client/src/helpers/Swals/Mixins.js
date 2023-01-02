import Swal from "sweetalert2";
import axios from "axios";
import {
  URL_U_PA_UPDATE_NAME,
  URL_U_PA_UPDATE_PROFILE_IMG,
  URL_P_PO_CONTACT_USER,
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
        if (!input) throw new Error("You didn't select any file.");
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

const contactPostOwnerMX = (post_id, token, t) => {
  return Swal.mixin({
    title: t("postDetail.contactUser"),
    inputAttributes: {
      autocapitalize: "off",
    },
    text: t("postDetail.contactInfo"),
    icon: "info",
    showCancelButton: true,
    confirmButtonText: t("postDetail.contactButton"),
    showLoaderOnConfirm: true,
    preConfirm: async () => {
      try {
        let response = await axios.post(
          URL_P_PO_CONTACT_USER + post_id,
          {},
          header(token)
        );
        if (response.status !== 202) {
          throw new Error(t("postDetail.swalErrorMsg"));
        }
        return response?.data?.msg || "Request accepted. Check your email.";
      } catch (error) {
        Swal.showValidationMessage(`Request failed: ${error.message}`);
      }
    },
    allowOutsideClick: () => !Swal.isLoading(),
  });
};

export const swalErrorMX = (errorMessage) => {
  return Swal.mixin({
    title: t("swalMixins.swalErrorMXTitle"),
    text: errorMessage,
    icon: "error",
    showConfirmButton: true,
  });
};

export const swalFoundTipsMX = (t) => {
  Swal.mixin({
    title: "Tips",
    html: `
      <ul>
      <li> - 
      ${t("home.foundTips1")}
      </li> 
      <li> - 
      ${t("home.foundTips2")}
      </li> 
      <li> - 
      ${t("home.foundTips3")}
      </li> 
      <li> - 
      ${t("home.foundTips4")}
      </li> 
      <li> - 
      ${t("home.foundTips5")}
      </li> 
      </ul>
      `,
    showCloseButton: true,
    showConfirmButton: true,
    confirmButtonText: t("searchForm.confirmButtonTips"),
  }).fire();
};

export const swalLostTipsMX = (t) => {
  Swal.mixin({
    title: "Tips",
    html: `
      <ul>
      <li> - 
      ${t("home.lostTips1")}
      </li> 
      <li> - 
      ${t("home.lostTips2")}
      </li> 
      <li> - 
      ${t("home.lostTips3")}
      </li> 
      <li> - 
      ${t("home.lostTips4")}
      </li> 
      <li> - 
      ${t("home.lostTips5")}
      </li> 
      </ul>
      `,
    showCloseButton: true,
    showConfirmButton: true,
    confirmButtonText: t("searchForm.confirmButtonTips"),
  }).fire();
};

const mixins = {
  editUserNameMX,
  editUserNameMX2,
  editUserProfileImgMX,
  contactPostOwnerMX,
  swalErrorMX,
  swalLostTipsMX,
};

export default mixins;
