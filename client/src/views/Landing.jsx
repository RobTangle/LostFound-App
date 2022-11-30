import React from "react";
import LangButton from "../components/lang-button";
import LoginButton from "../components/login-button";
import lostWallet from "../assets/dos.png";
import { useTranslation } from "react-i18next";
import { userExist } from "../helpers/check-user";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function Landing() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, isLoading, isAuthenticated, getAccessTokenSilently } =
    useAuth0();

  const landingVariant = {
    hidden: {
      opacity: 0,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        delay: 0.3,
        stiffness: 120,
      },
    },
  };
  const textVariants = {
    hidden: {
      opacity: 0,
      x: -100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        delay: 0.7,
        stiffness: 120,
      },
    },
  };

  if (!isLoading && isAuthenticated) {
    userExist(user, isAuthenticated, navigate, getAccessTokenSilently);
  } else if (!isLoading && !isAuthenticated) {
    return (
      <motion.div
        className="flex flex-col w-full items-center justify-center"
        variants={landingVariant}
        initial="hidden"
        animate="visible">
        <section className="bg-gray-800 text-gray-100">
          <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
            <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg md:text-left">
              <h1 className="text-[#3b66ab] text-3xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-600 to-emerald-800">
                LOST
                <span className="text-[#3b66ab] text-3xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-700">
                  FOUND
                </span>
              </h1>
              <motion.ul
                className="mt-6 mb-8  md:text-lg sm:mb-12 "
                variants={textVariants}
                initial="hidden"
                animate="visible">
                <li className=" text-slate-600  ">{t("landing.list1")}</li>
                <li className="text-slate-600">{t("landing.list2")}</li>
              </motion.ul>

              <div className="flex flex-col gap-5 space-y-4  items-end justify-center md:flex-row  md:justify-start">
                <LangButton />
                <LoginButton style="border-solid border-b-2 text-green px-3 py-2  " />
              </div>
            </div>
            <div className="flex w-full mx-5 items-center justify-center mt-8 lg:mt-0 h-72 sm:h-80 max-w-[550px]">
              <img
                src={lostWallet}
                alt=""
                className="object-contain w-full-h-full "
              />
            </div>
          </div>
        </section>
      </motion.div>
    );
  }
}
