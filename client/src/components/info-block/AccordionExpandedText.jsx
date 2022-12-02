import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AccordionExpandedText({
  mainColor,
  hiddenProp,
  text1,
  text2,
  text3,
}) {
  return (
    <AnimatePresence>
      {!hiddenProp && (
        <motion.div
          className={` w-full  md:px-8 md:py-8  px-5 py-3 text-white  ${mainColor}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          key="modal">
          <div className="flex flex-col gap-3 md:text-lg">
            <p>{text1}</p>
            <p>{text2}</p>
            <p>{text3}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
