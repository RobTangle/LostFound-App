import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Banner({ leftSrc, leftImage, containerStyle, homeVariant }) {
  const { t } = useTranslation();

  return (
    <motion.div
      className={
        " sm:flex justify-center sm:mx-auto bg-home bg-opacity-10 " +
        containerStyle
      }
      variants={homeVariant}
      initial="hidden"
      whileInView="visible"
      exit="hidden"
      viewport={{ once: true, amount: 0.8 }}>
      <div className={"h-full w-1/2 " + (leftImage && "max-w-[300px]")}>
        {leftImage && <img className=" h-full object-contain " src={leftSrc} />}
      </div>
      <div className="flex flex-col justify-center items-start max-w-[700px] text-gray font-sans">
        <p className="text-white font-semibold leading-relaxed text-2xl">
          {t("home.welcome")}
        </p>
        <p className="text-white leading-relaxed text-xl">
          {t("home.welcomeText")}
        </p>
      </div>
    </motion.div>
  );
}
