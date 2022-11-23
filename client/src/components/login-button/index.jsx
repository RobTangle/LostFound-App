import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";

export default function LoginButton() {
  const { t } = useTranslation();
  const {
    loginWithRedirect,
  } = useAuth0();

  return (
    <button
      onClick={loginWithRedirect}
      className="px-3 py-2 border-solid border-b-2 text-green  hover:border-b-blue hover:text-blue transition-all duration-500 ease-in-out">
      {t("landing.login")}
    </button>
  );
}
