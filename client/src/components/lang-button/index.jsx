import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import es from "../../assets/es.svg";
import en from "../../assets/en.svg";

export default function LangButton() {
  const { i18n } = useTranslation();
  const [selected, setSelected] = useState("en");
  function handleClickLanguage(lang) {
    i18n.changeLanguage(lang);
    setSelected(lang);
  }
  return (
    <div className="flex items-center gap-2">
      <img
        src={es}
        alt="ES"
        className="w-[40px]  h-[40px] hover:scale-[1.2]  cursor-pointer rounded-full transition-all duration-300"
        onClick={() => handleClickLanguage("es")}
      />
      <img
        src={en}
        alt="EN"
        className="w-[40px]  transition-all duration-300 h-[40px] hover:scale-[1.2] cursor-pointer rounded-full "
        onClick={() => handleClickLanguage("en")}
      />{" "}
    </div>
  );
}
