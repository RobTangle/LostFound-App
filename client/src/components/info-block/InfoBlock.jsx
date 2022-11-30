import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import AccordionBlock from "./AccordionBlock";
import AccordionExpandedText from "./AccordionExpandedText";
import useWindowDimensions from "../../helpers/getWindow";

export default function InfoBlock({
  handleFoundTip,
  handleLostTip,
  lostTip,
  foundTip,
  homeVariant,
}) {
  const { t } = useTranslation();
  const button_variants = {
    closed: { rotate: 180, transition: { duration: 0.5 } },
    open: { rotate: 0 },
  };
  const containerGrowsVariants = {
    unselected: { transition: { duration: 0.5 } },
    selected: { fontWeight: "bold" },
  };
  const { width } = useWindowDimensions();
  console.log("🚀 ~ file: InfoBlock.jsx ~ line 25 ~ width", width);

  return (
    <motion.section
      className="my-20 mx-auto"
      variants={homeVariant}
      initial="hidden"
      whileInView="visible"
      exit="hidden"
      viewport={{ once: true, amount: 0.8 }}>
      <div className="font-sans flex flex-col ">
        <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:flex md:gap-12 mx-5 md:mx-0 ">
          <AccordionBlock
            containerGrowsVariants={containerGrowsVariants}
            divAnimateBool={foundTip}
            button_variants={button_variants}
            handleButton={handleLostTip}
            buttonAnimateBool={lostTip}
            text={t("home.lostTip")}
            img="https://res.cloudinary.com/dfbxjt69z/image/upload/v1669737015/lostfound/3_ch7svi.png"
            mainColor="green"
          />
          {width < 640 && (
            <AccordionExpandedText
              mobile={true}
              hiddenProp={lostTip}
              mainColor="green"
              text1={t("home.lostTips1")}
              text2={t("home.lostTips2")}
              text3={t("home.lostTips3")}
            />
          )}

          <AccordionBlock
            containerGrowsVariants={containerGrowsVariants}
            divAnimateBool={lostTip}
            button_variants={button_variants}
            handleButton={handleFoundTip}
            buttonAnimateBool={foundTip}
            text={t("home.foundTip")}
            mainColor="blue"
            img="https://res.cloudinary.com/dfbxjt69z/image/upload/v1669737015/lostfound/2_ijje9p.png"
          />
          {width < 640 && (
            <AccordionExpandedText
              mobile={true}
              hiddenProp={foundTip}
              mainColor="blue"
              text1={t("home.foundTips1")}
              text2={t("home.foundTips2")}
              text3={t("home.foundTips3")}
            />
          )}
        </div>
        {width > 640 && (<>

        <AccordionExpandedText
          mobile={false}
          hiddenProp={foundTip}
          mainColor="blue"
          text1={t("home.foundTips1")}
          text2={t("home.foundTips2")}
          text3={t("home.foundTips3")}
          desktop={true}
        />
        <AccordionExpandedText
          mobile={false}
          hiddenProp={lostTip}
          mainColor="green"
          text1={t("home.lostTips1")}
          text2={t("home.lostTips2")}
          text3={t("home.lostTips3")}
          desktop={true}
          />
          </>
          )}

      </div>
    </motion.section>
  );
}
