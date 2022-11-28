import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import es from "../../assets/es.svg";
import en from "../../assets/en.svg";

export default function LangButton() {
  const { i18n } = useTranslation();
  const languageDetector = localStorage.getItem("i18nextLng");
  const [selected, setSelected] = useState(languageDetector);
  function handleClickLanguage(lang) {
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
    setSelected(lang);
  }
  return (
    <div className="flex items-center gap-2">
      <img
        src={es}
        alt="ES"
        className={
          (selected !== "es" && "grayscale  ") +
          " w-[40px]  h-[40px]  cursor-pointer rounded-lg overflow-hidden transition-all duration-100"
        }
        onClick={() => handleClickLanguage("es")}
      />
      <img
        src={en}
        alt="EN"
        className={
          (selected !== "en" && "grayscale  ") +
          " w-[40px]  transition-all  duration-100 h-[40px] cursor-pointer rounded-lg overflow-hidden "
        }
        onClick={() => handleClickLanguage("en")}
      />{" "}
    </div>
  );
}
