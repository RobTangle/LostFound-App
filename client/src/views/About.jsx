import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NavBar from "../components/NavBar/Navbar";

export function About() {
    const { t } = useTranslation();
    return (
        <div>
        <NavBar/>
     
        <div className="md:min-h-screen md:flex md:flex-col md:justify-center">
        <div className="flex w-full  justify-center my-5">
            
          {/* <Link
            className=" text-2xl md:text-5xl  font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-green/60 via-green to-blue/10"
            to="/home">
            LOST
            <span className="font-heading text-transparent bg-clip-text bg-gradient-to-r from-blue/50 via-blue/80 to-blue">
              FOUND
            </span>
          </Link> */}
        </div>
        <div className="flex flex-col md:flex-row md:mx-5 items-center justify-center font-sans mt-5 gap-3">
          <div className="md:max-w-[500px]">
            <p className="text-3xl text-blue md:text-5xl mb-5">
              {t("about.title")}
            </p>
            <p className="text-gray md:text-2xl mb-5">{t("about.subtitle")}</p>
            <Link
              to="/home"
              className=" text-left block font-semibold  w-fit bg-gray-200 hover:bg-blue hover:text-white px-6 border-b-2 border-blue py-2 text-gray transition-all duration-300">
              {t("about.homeBtn")}
            </Link>
          </div>
          <div>
            <img
              src="https://res.cloudinary.com/dfbxjt69z/image/upload/v1669853066/lostfound/Dise%C3%B1o_sin_t%C3%ADtulo_p2wjh0.png"
              alt=""
            />
          </div>
        </div>
      </div>
      </div>
    );
  }
  