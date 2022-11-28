import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { registerFormValidator } from "../../helpers/register-form-validator";
import { validAttr } from "../../helpers/validAttributesObj";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { URL_U_PO_REGISTER_NEW_USER } from "../../constants/url";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Spinner from "../spinner/Spinner";

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
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
        // RENDER ERROR :
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
          // RENDER successful and welcome message, with button to continue to /Home..
        } else {
          // RENDER error message.
        }
      }
    } catch (error) {
      console.log("ERROR EN EL HANDLE_SUBMIT = ", error.message);
      errorMessage = error.message;
    }
  };
  if (!isAuthenticated && !isLoading) {
    Swal.fire({
      title: `${t("registerForm.errorTitle")}`,
      text: `${t("registerForm.errorSubtitle")}`,
      icon: "info",
      confirmButtonColor: "#2676fc",
      confirmButtonText: `${t("registerForm.errorButton")}`,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  }
  if (isLoading) return <Spinner/>;
  if (isAuthenticated && !isLoading) {
    return (
      <div className="grid md:flex">
        <div className="grid gap-2 font-sans my-5 md:w-96 lg:w-[600px]">
          <h1 className="text-3xl text-blue md:text-6xl mt-6 md:ml-12 w-full text-center md:text-start p-2 md:p-0 md:w-1/2">
            {t("registerForm.title")}
          </h1>
          <p className=" text-gray text-medium md:text-xl md:ml-12 w-full text-center md:text-start md:w-2/3">
            {t("registerForm.subtitle")}
          </p>
        </div>
        <form
          className="w-full mx-auto md:m-8 p-4 sm:p-6 md:p-0"
          onSubmit={handleSubmit}>
          <div className="flex flex-wrap mb-2 gap-2">
            <div className="w-full md:w-1/2 p-3">
              <label
                className="block uppercase tracking-wide text-gray text-xs font-bold mb-1 font-sans"
                htmlFor="grid-last-name">
                {t("registerForm.userNameLabel")}
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray border-solid border-b-2 border-gray/50 py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500  font-sans"
                id="grid-last-name"
                name="name"
                value={userForm.name}
                maxLength={validAttr.name.maxLength}
                type="text"
                placeholder={t("registerForm.userNamePlaceholder")}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 p-3">
              <label
                className="block uppercase tracking-wide text-gray text-xs font-bold mb-1 font-sans"
                htmlFor="grid-last-name">
                {t("registerForm.emailLabel")}
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray border-solid border-b-2 border-gray/50 py-3  leading-tight focus:outline-none focus:bg-white focus:border-gray-500  font-sans"
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

          <div className="w-full md:w-1/2 px-3 md:mt-5">
            <button className="w-fit bg-gray-200 hover:bg-blue hover:text-white px-3 border-b-2 border-blue py-2 text-slate-500 transition-all duration-300">
              {t("registerForm.submitButton")}
            </button>
          </div>
        </form>
      </div>
    );
  }
};
