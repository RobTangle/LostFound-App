import React from "react";
import { motion } from "framer-motion";
import { HiArrowDown } from "react-icons/hi";

export default function AccordionBlock({
  containerGrowsVariants,
  button_variants,
  handleButton,
  buttonAnimateBool,
  text,
  img,
  mainColor,
}) {
  return (
    <motion.div
      className={`w-full md:flex md:items-center mx-auto grid grid-cols-3 items-center`}>
      <div className="w-20 md:w-32 mx-auto">
        <img
          className="object-cover w-full  h-full object-center"
          src={img}
          alt=""
        />
      </div>
      <div className="flex flex-col justify-between py-1 lg:mx-6 font-extralight col-span-2 ">
        <motion.p
          className="lg:text-xl text-slate-800 hover:text-slate-600 hover:cursor-pointer md:w-80"
          variants={containerGrowsVariants}
          initial="closed"
          animate={buttonAnimateBool ? "unselected" : "selected"}>
          {text}
        </motion.p>
      </div>
      <motion.button
        className={`text-${mainColor} text-2xl md:mx-6 mx-auto col-span-3 animate animate-pulse`}
        onClick={handleButton}
        variants={button_variants}
        animate={buttonAnimateBool ? "open" : "closed"}>
        <HiArrowDown />
      </motion.button>
    </motion.div>
  );
}
