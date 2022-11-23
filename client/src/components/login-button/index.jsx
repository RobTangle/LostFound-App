import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { URL } from "../../constants/url";
import axios from "axios";
import { userExist } from "../../helpers/check-user";

export default function LoginButton() {
  const { t } = useTranslation();
  const {
    loginWithRedirect,
    user,
    isAuthenticated,
    getAccessTokenSilently,
    isLoading,
  } = useAuth0();
  const navigate = useNavigate();

  if (!isLoading && isAuthenticated) {
    userExist(user, isAuthenticated);
  }

  return (
    <button
      onClick={loginWithRedirect}
      className="px-3 py-2 border-solid border-b-2 text-green  hover:border-b-blue hover:text-blue transition-all duration-500 ease-in-out">
      {t("landing.login")}
    </button>
  );
}
