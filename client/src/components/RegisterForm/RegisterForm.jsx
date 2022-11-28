import React, { useState, useEffect } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { registerFormValidator } from "../../helpers/register-form-validator";
import { validAttr } from "../../helpers/validAttributesObj";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { URL_U_PO_REGISTER_NEW_USER } from "../../constants/url";

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isAuthenticated, getAccessTokenSilently } =
    useAuth0();

  const { t } = useTranslation();
  let accessToken;
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    profile_img: "",
  });

  //! -------------------
  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        accessToken = await getAccessTokenSilently();
        localStorage.setItem("accessTokenLostFound", accessToken);
        console.log("USER ", user);
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserMetadata();
    setUserForm({
      ...userForm,
      email: user?.email,
      profile_img: user?.picture,
    });
  }, [getAccessTokenSilently, user?.sub]);
  //! ---------------------------------------------------------------

  //! TRAERME EL TOKEN Y PASARLO POR EL DISPATCH
  // if (!isLoading && isAuthenticated && user) {
  //   const accessToken = getAccessTokenSilently();
  //   console.log("ACCESS TOKEN = ", accessToken);
  //   console.log("USER = ", user);
  //   localStorage.setItem("accessTokenLostFound", accessToken);
  //   setUserForm({ ...userForm, email: user?.email });
  // }
  // MENSAJE DE ERROR AL SUBMITEAR :
  let errorMessage = "";
  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const userDataValidated = registerFormValidator(userForm, t); //retorna un objeto con data validada y correcta para enviar al servidor, o un { error: error.message}
      if (userDataValidated.error) {
        console.log(`Error en la validación: ${userDataValidated.error}`);
        errorMessage = userDataValidated.error;
        // RENDERIZAR ERROR :
      }
      if (userDataValidated.email) {
        const accessTokenFromLS = localStorage.getItem("accessTokenLostFound");
        // console.log("ACCESSTOKENFROMLS = ", accessTokenFromLS);
        const response = await axios.post(
          URL_U_PO_REGISTER_NEW_USER,
          userDataValidated,
          {
            headers: {
              Authorization: `Bearer ${accessTokenFromLS}`,
            },
          }
        );
        console.log("response.data = ", response.data);
        if (response.status === 200 || response.status === 201) {
          // RENDER mensaje exitoso y de bienvenida, con botón para continuar al /Home.
        } else {
          // RENDER error message.
        }
      }
    } catch (error) {
      console.log("ERROR EN EL HANDLESUBMIT = ", error.message);
      errorMessage = error.message;
    }
  };

  return (
    <div className="grid md:flex">
      <div className="grid">
        <h1 className="text-3xl font-extralight text-neutral-400 md:text-5xl mt-6 md:ml-12 w-full text-center md:text-start p-2 md:p-0 md:w-1/2">
          {t("registerForm.title")}
        </h1>
        <p className="font-extralight text-indigo-400 text-medium md:text-xl md:ml-12 w-full text-center md:text-start md:w-1/2">
          {t("registerForm.subtitle")}
        </p>
      </div>
      <form
        className="w-full mx-auto md:m-8 p-4 sm:p-6 md:p-0"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap mb-2 gap-2">
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              {t("registerForm.userNameLabel")}
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              name="name"
              value={userForm.name}
              maxLength={validAttr.name.maxLength}
              type="text"
              placeholder={t("registerForm.userNamePlaceholder")}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              {t("registerForm.emailLabel")}
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
              id="grid-last-name"
              type="email"
              name="email"
              maxLength={validAttr.email.maxLength} //! configurar esto
              value={userForm.email}
              onChange={handleChange}
              disabled
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 px-3">
          <button className="w-full bg-gray-200 hover:bg-emerald-300 hover:text-white border border-emerald-300 rounded py-3 text-slate-500">
            {t("registerForm.submitButton")}
          </button>
        </div>
      </form>
    </div>
  );
};
