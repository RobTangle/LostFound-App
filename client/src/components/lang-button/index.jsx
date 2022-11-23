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
        className="w-[40px] h-[40px] hover:scale-150 cursor-pointer rounded-full"
        onClick={() => handleClickLanguage("es")}
      />
      {/* <button
          onClick={() => handleClickLanguage("es")}
          className={
            (selected === "es"
              ? `bg-color_primary text-color_bg_variant`
              : `bg-transparent`) + `px-3 rounded-md py-1 text-sm h-fit`
          }
        >
          ES
        </button> */}
      <img
        src={en}
        alt="EN"
        className="w-[40px] h-[40px] hover:scale-150 cursor-pointer rounded-full"
        onClick={() => handleClickLanguage("en")}
      />{" "}
      {/* <button
        className={
          (selected === "en"
            ? `bg-color_primary text-color_bg_variant bg-en)`
            : `bg-transparent`) + `px-3 rounded-md py-1 text-sm h-fit`
        }
        onClick={() => handleClickLanguage("en")}
      >
        EN
      </button> */}
    </div>
  );
}
