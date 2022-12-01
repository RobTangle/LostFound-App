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
      className={` w-full mt-4  rounded-sm px-5 py-3 text-white  ${mainColor}`}>
      <div className="flex flex-col gap-3">
        <p>{text1}</p>
        <p>{text2}</p>
        <p>{text3}</p>
      </div>
    </div>
  );
}
