import React from "react";

export default function AccordionExpandedText({
  mainColor,
  hiddenProp,
  text1,
  text2,
  text3,
}) {
  return (
    <div
      hidden={hiddenProp}
      className={` w-full  md:px-8 md:py-5  px-5 py-3 text-white  ${mainColor}`}>
      <div className="flex flex-col gap-3 md:text-lg">
        <p>{text1}</p>
        <p>{text2}</p>
        <p>{text3}</p>
      </div>
    </div>
  );
}
