import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Banner({
  leftSrc,
  leftImage,
  containerStyle,
  homeVariant,
}) {
  const { t } = useTranslation();

  return (
    <motion.div
      className={
        "flex flex-col py-5 px-5 md:flex-row justify-center items-center md:mx-auto bg-home bg-opacity-10 my-10 md:my-16 min-h-[500px]  " +
        containerStyle
      }
      variants={homeVariant}
      initial="hidden"
      whileInView="visible"
      exit="hidden"
      viewport={{ once: true}}>
      <div className={"h-full w-1/2 " + (leftImage && "max-w-[300px]")}>
        {leftImage && <img className=" h-full object-contain " src={leftSrc} />}
      </div>
      <div className="flex flex-col justify-center items-start max-w-[700px] text-gray font-sans">
        <p className="text-white font-semibold leading-relaxed text-xl md:text-2xl">
          {t("home.welcome")}
        </p>
        <p className="text-white leading-relaxed  md:text-xl">
          {t("home.welcomeText")}
        </p>
      </div>
    </motion.div>
  );
}
