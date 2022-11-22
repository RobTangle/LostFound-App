import React from 'react'
import { useState } from "react";
import { useTranslation } from "react-i18next";




export default function LangButton() {
  const {i18n} = useTranslation();
  const [selected, setSelected] = useState("en");
   function handleClickLanguage(lang) {
     i18n.changeLanguage(lang);
     setSelected(lang);
   }
  return (
    <div className="flex items-center">
      <button
        onClick={() => handleClickLanguage("es")}
        className={
          (selected === "es"
            ? `bg-color_primary text-color_bg_variant`
            : `bg-transparent`) + ` px-3  rounded-md py-1 text-sm h-fit`
        }>
        ES
      </button>
      <button
        className={
          (selected === "en"
            ? `bg-color_primary text-color_bg_variant`
            : `bg-transparent`) + ` px-3 rounded-md py-1 text-sm h-fit`
        }
        onClick={() => handleClickLanguage("en")}>
        EN
      </button>
    </div>
  );
}
