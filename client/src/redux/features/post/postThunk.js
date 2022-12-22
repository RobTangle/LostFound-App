import {
  setSearchResults,
  setNewPost,
  setPostDetail,
  setUpdatePost,
  setDeletedPost,
  setContactPostOwner,
} from "./postSlice";
import axios from "axios";
import {
  URL_P_D_DELETE_POST,
  URL_P_G_POST_INFO,
  URL_P_G_SEARCH_BY_QUERY,
  URL_P_PO_NEW_POST,
} from "../../../constants/url";
import { header } from "../../../constants/header";
import Swal from "sweetalert2";

export function createPost(post, token, setPost, t) {
  return async function () {
    try {
      const response = await axios.post(URL_P_PO_NEW_POST, post, token);
      if (response.status === 201) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: t("swal.createPostTitleSuccess"),
          showConfirmButton: true,
          timer: 4000,
        });
        setPost({
          name_on_doc: "",
          number_on_doc: "",
          country_found: "",
          date_found: "",
          blurred_imgs: [],
          comments: "",
          additional_contact_info: "",
        });
      }
    } catch (error) {
      console.log(error.message);
      Swal.fire({
        position: "center",
        icon: "error",
        title: t("swal.createPostTitleError"),
        text: error.message,
        showConfirmButton: true,
        timer: 8000,
      });
    }
  };
}

export function searchPost(
  { name, number, country, date_lost, pag, lim, sortBy },
  token
) {
  return async function (dispatch) {
    try {
      let response = await axios.get(
        URL_P_G_SEARCH_BY_QUERY +
          `?name=${name}&number=${number}&country=${country}&date_lost=${date_lost}&pag=${pag}&lim=${lim}&sortBy=${sortBy}`,
        header(token)
      );
      return dispatch(setSearchResults(response.data));
    } catch (error) {
      return dispatch(
        setSearchResults({
          error: error.response?.data?.error || error.message,
        })
      );
    }
  };
}

export function fetchPostDetail(post_id, token) {
  return async function (dispatch) {
    try {
      let response = await axios.get(
        URL_P_G_POST_INFO + post_id,
        header(token)
      );
      return dispatch(setPostDetail(response.data));
    } catch (error) {
      return dispatch(setPostDetail({ error: error.message }));
    }
  };
}

export function updatePost(obj, post_id, token) {
  return async function (dispatch) {
    try {
      let response = await axios.post(
        URL_P_PA_UPDATE_POST + post_id,
        obj,
        header(token)
      );
      return dispatch(setUpdatePost(response.data));
    } catch (error) {
      return dispatch(setUpdatePost({ error: error.message }));
    }
  };
}

export function deletePost(post_id, token) {
  return async function (dispatch) {
    try {
      let response = await axios.delete(
        URL_P_D_DELETE_POST + post_id,
        header(token)
      );
      return dispatch(setDeletedPost(response.data));
    } catch (error) {
      return dispatch(setDeletedPost({ error: error.message }));
    }
  };
}

export function contactPostOwner(post_id, token) {
  return async function (dispatch) {
    try {
      let response = await axios.post(
        URL_P_PO_CONTACT + post_id,
        {},
        header(token)
      );
      response.status === 202
        ? Swal.fire({
            position: "center",
            icon: "success",
            title: "Processing request. Check your email inbox.",
            showConfirmButton: false,
            timer: 1500,
          })
        : response.status >= 400 &&
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Ups! Something went wrong.",
            showConfirmButton: false,
            timer: 1500,
          });
      return dispatch(setContactPostOwner(response.data));
    } catch (error) {
      return dispatch(setContactPostOwner({ error: error.message }));
    }
  };
}
