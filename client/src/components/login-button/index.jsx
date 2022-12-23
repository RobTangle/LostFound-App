import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";

export default function LoginButton({ style }) {
  const { t } = useTranslation();
  const { loginWithRedirect } = useAuth0();

  return (
    // <button
    //   onClick={loginWithRedirect}
    //   className={style  + "  hover:border-b-blue hover:text-blue transition-all duration-500 ease-in-out"}>
    //   {t("landing.login")}
    // </button>

    <button
      className={style + 'inline-block rounded-full bg-gradient-to-r from-emerald-400 via-indigo-400 to-indigo-700 p-[2px] hover:text-black hover:scale-110 cursor-pointer focus:outline-none active:text-opacity-75 hover:shadow-lg active:scale-90 transition duration-150 active:outline-none'}
      onClick={loginWithRedirect}
    >
      <span className='block rounded-full bg-white px-8 py-3 text-sm font-medium hover:bg-transparent hover:text-white'>
      {t("landing.login")}
      </span>
    </button>
  );
}
