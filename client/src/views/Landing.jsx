import React from "react";
import LangButton from "../components/lang-button";
import LoginButton from "../components/login-button";
import lostWallet from "../assets/dos.png";
import { useTranslation } from "react-i18next";

export function Landing() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <section className="bg-gray-800 text-gray-100">
        <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
          <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg md:text-left">
            <h1 className="text-[#3b66ab] text-3xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-600 to-emerald-800">
              LOST
              <span className="text-[#3b66ab] text-3xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-700">
                FOUND
              </span>
            </h1>
            <ul className="mt-6 mb-8  md:text-lg sm:mb-12 list-disc">
              <li className="md:ml-6 text-slate-600">{t("landing.list1")}</li>
              <li className="md:ml-6 text-slate-600">{t("landing.list2")}</li>
            </ul>

            <div className="flex flex-col space-y-4 gap-2 items-center justify-center md:flex-row space-y-0 md:justify-start">
              <LangButton />
              <LoginButton />
            </div>
          </div>
          <div className="flex w-full mx-5 items-center justify-center mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
            <img
              src={lostWallet}
              alt=""
              className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 "
            />
          </div>
        </div>
      </section>
      {/* <LangButton />
      <LoginButton /> */}
    </div>
  );
}
