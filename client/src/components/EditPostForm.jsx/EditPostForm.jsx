import React, { useState, useEffect } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { getCountries } from "../../redux/features/user/userThunk";
import { postFormValidator } from "../../helpers/post-form-validator";
import { validAttr } from "../../helpers/validAttributesObj";
import { parseDateToSetMaxDate } from "../../helpers/dateParsers";
import Swal from "sweetalert2";
import accessTokenName from "../../constants/accessToken";
import { updatePost } from "../../redux/features/post/postThunk";

export const EditPostForm = ({ postToEdit, closeModal }) => {
  const countries = useSelector((state) => state.user.countries);
  const dispatch = useDispatch();
  const currentLang = i18next.language.slice(0, 2);
  const { t } = useTranslation();

  const [post, setPost] = useState({
    name_on_doc: postToEdit?.name_on_doc,
    number_on_doc: postToEdit?.number_on_doc || "",
    country_found: postToEdit?.country_found || "",
    date_found: postToEdit?.date_found.split("T")[0] || "",
    blurred_imgs: postToEdit?.blurred_imgs || [],
    comments: postToEdit?.comments || "",
    additional_contact_info:
      postToEdit?.user_posting?.additional_contact_info || "",
  });

  const maxDateAllowed = parseDateToSetMaxDate();

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  //CLOUDINARY-------------------------------------
  const handleImage = async (e) => {
    const image = e.target.files[0];
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ilrqfhcn");
    data.append("cloud_name", "dtfcydx7h");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dtfcydx7h/image/upload`,
      { method: "POST", body: data }
    );
    const dataNew = await response.json();
    console.log(dataNew);
    setPost({
      ...post,
      blurred_imgs: [dataNew.secure_url],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("POST TO VALIDATE =", post);
    const validation = postFormValidator(post, t);
    if (validation.error) {
      console.log(`Error en la validación: ${validation.error}`);
      Swal.fire({
        title: "Input error",
        text: `${validation.error}`,
        icon: "warning",
        confirmButtonColor: "#2676fc",
        confirmButtonText: "OK",
      });
    }
    if (validation === true) {
      let accessToken = localStorage.getItem(accessTokenName);
      // const accessToken = await getAccessTokenSilently();
      console.log("Despachando createPost !", post);
      dispatch(updatePost(post, postToEdit._id, accessToken, t));
    }
  };

  useEffect(() => {
    !countries.length && dispatch(getCountries(currentLang));
  }, [dispatch]);

  return (
    <div className="grid md:flex font-sans">
      <div className="grid px-5 py-5 mt-5 md:mt-0 md:flex flex-col justify-center items-center md:justify-start md:items-start md:gap-5 bg-blue">
        <h1 className="text-2xl text-white md:text-5xl md:mt-6 md:ml-8 w-full text-center md:text-start p-2 md:p-0 lg:w-3/4">
          {t("postForm.editTitle")}
        </h1>
        <p className=" text-white text-medium md:text-xl md:ml-8 w-full text-center md:text-start lg:w-1/2">
          {t("postForm.editSubtitle")}
        </p>
      </div>
      <form
        className="w-full mx-auto h-full flex flex-col justify-between sm:px-6 md:px-2 text-gray font-sans"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap  mb-1 gap-2 w-full md:grid md:grid-cols-2">
          <div className="w-full  px-3">
            <label
              className=" uppercase tracking-wide text-gray-700 text-sm font-bold mt-2 mb-1 grid "
              htmlFor="grid-last-name"
            >
              {t("postForm.nameLabel")}
              <span className="lowercase font-light">
                ({t("postForm.nameSubLabel")})
              </span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              name="name_on_doc"
              value={post.name_on_doc}
              maxLength={validAttr.name_on_doc.maxLength}
              minLength={validAttr.name_on_doc.minLength}
              required
              type="text"
              placeholder={t("postForm.namePlaceholder")}
              onChange={handleChange}
            />
          </div>
          <div className="w-full   px-3">
            <label
              className=" uppercase tracking-wide text-gray-700 text-sm font-bold mt-2 mb-1 grid"
              htmlFor="grid-last-name"
            >
              {t("postForm.numberLabel")}
              <span className="lowercase font-light">
                ({t("postForm.numberSubLabel")})
              </span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
              id="grid-last-name"
              type="text"
              name="number_on_doc"
              maxLength={validAttr.number_on_doc.maxLength}
              minLength={validAttr.number_on_doc.minLength}
              value={post.number_on_doc}
              placeholder="10.111.213 | 4544-2222-2222-2222"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap  mt-1 mb-1 md:grid md:grid-cols-2">
          <div className="w-full  px-3 mb-2 md:mb-0">
            <label
              className="block uppercase tracking-wide text-sm font-bold mt-2 mb-1 after:content-['*'] after:ml-0.5"
              htmlFor="grid-state"
            >
              {t("postForm.countryLabel")}
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                value={post.country_found}
                name="country_found"
                required
                onChange={handleChange}
              >
                <option value={post.country_found}>
                  {t("postForm.selectCountry")}
                </option>
                {countries.length &&
                  countries.map((c) => (
                    <option value={c[0]} key={c[0]}>
                      {c[1]}
                    </option>
                  ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full px-3 mb-2 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-sm font-bold mt-2 mb-1 after:content-['*'] after:ml-0.5"
              htmlFor="grid-zip"
            >
              {t("postForm.dateLabel")}
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 "
              id="grid-zip"
              type="date"
              required
              min="1971-01-01"
              value={post.date_found}
              max={maxDateAllowed}
              name="date_found"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-sm font-bold mt-2 mb-1"
            htmlFor="grid-zip"
          >
            {t("postForm.imageLabel")}
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 mt-2 mb-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-zip"
            type="file"
            accept=".png, .jpg, .jpeg"
            multiple
            name="blurred_images"
            onChange={handleImage}
          />
          <label
            className="block uppercase tracking-wide text-gray-700 text-sm font-bold mt-2 mb-1"
            htmlFor="comments"
          >
            {t("postForm.commentsLabel")}
          </label>
          <textarea
            name="comments"
            id="comments"
            placeholder={t("postForm.commentsPlaceHolder")}
            cols="30"
            rows="3"
            value={post.comments}
            onChange={handleChange}
            maxLength={validAttr.comments.maxLength}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
          ></textarea>
        </div>
        <div className="w-full  px-3 mt-4">
          <label
            className=" tracking-wide text-gray-700 text-sm font-bold mt-2 mb-1 grid"
            htmlFor="grid-last-name"
          >
            {t("postForm.additional_contact_info_label")}
            <span className="font-light">
              ({t("postForm.additional_contacto_info_sub")})
            </span>
          </label>
          <textarea
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            name="additional_contact_info"
            value={post.additional_contact_info}
            maxLength={validAttr.additional_contact_info.maxLength}
            type="text"
            placeholder={t("postForm.additional_contact_info_placeholder")}
            onChange={handleChange}
          />
        </div>
        <div className="flex w-full lg:w-1/2 px-3 mt-2">
          <button className="w-1/2 bg-gray-200 hover:bg-blue hover:text-white px-3 border-b-2 border-blue py-2 text-slate-500 transition-all duration-300">
            {t("postForm.editSubmitButton")}
          </button>
          <button
            onClick={closeModal}
            className="w-1/3 ml-5 bg-gray-200 hover:bg-blue hover:text-white px-3 border-b-2 border-blue py-2 text-slate-500 transition-all duration-300"
          >
            {t("postForm.editCloseButton")}
          </button>
        </div>
      </form>
    </div>
  );
};
