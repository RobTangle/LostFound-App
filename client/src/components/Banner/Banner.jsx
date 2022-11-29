import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Banner({ leftSrc, leftImage, containerStyle }) {
  const { t } = useTranslation();
  const homeVariant = {
    hidden: {
      opacity: 0.3,
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
  return (
    <motion.div
      className={" sm:flex justify-center sm:mx-auto " + containerStyle}
      variants={homeVariant}
      initial="hidden"
      whileInView="visible"
      exit="hidden"
      viewport={{ once: true, amount: 0.8 }}>
      <div className={"h-full w-1/2 " + (leftImage && "max-w-[300px]")}>
        {leftImage && <img className=" h-full object-contain " src={leftSrc} />}
      </div>
      <div className="flex flex-col justify-center items-start max-w-[700px] text-gray">
        <p className="text-gray-600 leading-relaxed text-xl">
          {t("home.welcomeText")}
        </p>
      </div>
    </motion.div>
  );
}
