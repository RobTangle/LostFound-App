import React, { useState, useEffect } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { getCountries } from "../../redux/features/user/userThunk";
import { postFormValidator } from "../../helpers/post-form-validator";
import { validAttr } from "../../helpers/validAttributesObj";
import { parseDateToSetMaxDate } from "../../helpers/dateParsers";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { URL_P_PO_NEW_POST } from "../../constants/url";
import { header } from "../../constants/header";

const PostForm = () => {
  const countries = useSelector((state) => state.user.countries);
  // const results = useSelector((state) => state.post.searchResults);
  const dispatch = useDispatch();
  const currentLang = i18next.language.slice(0, 2);
  const { t } = useTranslation();
  const { getAccessTokenSilently } = useAuth0();
  //CLOUDINARY-------------------------------------
  //eslint-disable-next-line

  const CLOUD_NAME = "lostfound";
  const UPLOAD_PRESET = "dyzge4vha";

  const upload = async (e) => {
    const img = e.target.files[0];
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", CLOUD_NAME);
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${UPLOAD_PRESET}/image/upload`,
      { method: "POST", body: data }
    );
    const dataNew = await response.json();
    setPost({
      ...post,
      blurred_imgs: dataNew.secure_url,
    });
    // reemplazar con un mensaje de éxito o la acción deseada
  };
  //-------------------------------------------------------------

  const [post, setPost] = useState({
    name_on_doc: "",
    number_on_doc: "",
    country_found: "",
    date_found: "",
    blurred_imgs: "",
    comments: "",
    additional_contact_info: "",
  });

  const maxDateAllowed = parseDateToSetMaxDate();

  // MENSAJE DE ERROR AL SUBMITEAR :
  let errorMessage = "";
  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = postFormValidator(post, t);
    if (validation.error) {
      console.log(`Error en la validación: ${validation.error}`);
      alert(validation.error);
      errorMessage = validation.error;
    }
    if (validation === true) {
      const accessToken = await getAccessTokenSilently();
      console.log("Despachando createPost !", post);
      try {
        const response = await axios.post(
          URL_P_PO_NEW_POST,
          post,
          header(accessToken)
        );
        if (response.status === 201) {
          alert("Publicación creada exitosamente");
          console.log(response);
        }
        if (response.status >= 400) {
          alert("Algo salió mal. " + response.data?.error);
          console.log(response);
        }
      } catch (error) {
        alert("Hubo un error. " + error.message);
        console.log(error);
        // dispatch(createPost(post, accessToken));
      }
    }
  };

  useEffect(() => {
    !countries.lenght && dispatch(getCountries(currentLang));
  }, [dispatch]);

  return (
    <div className="grid md:flex">
      <div className="grid">
        <h1 className="text-3xl font-extralight text-neutral-400 md:text-5xl mt-6 md:ml-12 w-full text-center md:text-start p-2 md:p-0 md:w-1/2">
          {t("postForm.title")}
        </h1>
        <p className="font-extralight text-indigo-400 text-medium md:text-xl md:ml-12 w-full text-center md:text-start md:w-1/2">
          {t("postForm.subtitle")}
        </p>
      </div>
      <form
        className="w-full mx-auto md:m-8 p-4 sm:p-6 md:p-0"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap mb-2 gap-2">
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 grid"
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
              type="text"
              placeholder={t("postForm.namePlaceholder")}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 grid"
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
              value={post.number_on_doc}
              placeholder="10.111.213 | 4544-2222-2222-2222"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap mb-2">
          <div className="w-full sm:w-1/2 md:w-1/4 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              {t("postForm.countryLabel")}
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                name="country_found"
                required
                onChange={handleChange}
              >
                <option value="">{t("postForm.selectCountry")}</option>
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
          <div className="w-full sm:w-1/2 md:w-1/4 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-zip"
            >
              {t("postForm.dateLabel")}
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-zip"
              type="date"
              required
              min="1971-01-01"
              max={maxDateAllowed}
              name="date_found"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-zip"
          >
            {t("postForm.imageLabel")}
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 mb-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-zip"
            type="file"
            accept=".png, .jpg, .jpeg"
            multiple
            name="blurred_images"
            onChange={upload}
          />
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="comments"
          >
            {t("postForm.commentsLabel")}
          </label>
          <textarea
            name="comments"
            id="comments"
            placeholder={t("postForm.commentsPlaceHolder")}
            cols="30"
            rows="5"
            value={post.comments}
            onChange={handleChange}
            maxLength={validAttr.comments.maxLength}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
          ></textarea>
        </div>
        <div className="w-full md:w-1/2 px-3 mt-4">
          <label
            className=" tracking-wide text-gray-700 text-xs font-bold mb-2 grid"
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
        <div className="w-full md:w-1/2 px-3 mt-2">
          <button className="w-full bg-gray-200 hover:bg-emerald-300 hover:text-white border border-emerald-300 rounded py-3 text-slate-500">
            {t("postForm.submitButton")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
