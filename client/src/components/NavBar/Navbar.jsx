import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";
import { BiMenu } from "react-icons/bi";
import { VscClose } from "react-icons/vsc";
import { FaUserCircle } from "react-icons/fa";

import { Logout } from "../logout-button/Logout";
import LoginButton from "../login-button";
import NavbarLink from "./NavbarLink";

function Navbar() {
  const [menu, setMenu] = useState(false);
  const { isLoading, isAuthenticated } = useAuth0();
  const { t } = useTranslation();

  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className="w-full h-full min-h-[40px] items-center mx-auto md:shadow-3xl flex justify-between text-gray font-sans ">
      <div className="md:hidden">
        <div className="mt-4">
          <Link
            className="text-2xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-600 to-indigo-700 ml-4 mt"
            to="/home"
          >
            LOST
            <span className="font-heading text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-700">
              FOUND
            </span>
          </Link>
        </div>
        {menu ? (
          <button
            className="text-2xl absolute right-5 top-5 z-50"
            onClick={handleMenu}
          >
            <VscClose />
          </button>
        ) : (
          <>
            <button
              className="text-2xl absolute right-5 top-5 z-50"
              onClick={handleMenu}
            >
              <BiMenu />
            </button>
          </>
        )}
      </div>
      {menu && (
        <div className="flex flex-col w-full h-screen z-30 pt-8 mt-5  px-5 gap-5 absolute top-0 bg-white text-gray md:hidden">
          <NavbarLink
            path="/home"
            text={t("navbar.home")}
            divStyle="hover:text-blue duration-300 transition-all"
          />

          {!isLoading && isAuthenticated ? (
            <>
              <NavbarLink
                path="/about"
                divStyle="hover:text-blue duration-300 transition-all"
                text={t("navbar.about")}
              />
              <NavbarLink
                path="/services"
                divStyle="hover:text-blue duration-300 transition-all"
                text={t("navbar.services")}
              />
              <NavbarLink
                path="/us"
                divStyle="hover:text-blue duration-300 transition-all"
                text={t("navbar.why_us")}
              />
              <NavbarLink
                path="/contact"
                divStyle="hover:text-blue duration-300 transition-all"
                text={t("navbar.contact")}
              />
              <NavbarLink
                path="/profile"
                divStyle="hover:text-blue duration-300 transition-all"
                text={t("navbar.profile")}
              />

              <Logout style="hover:text-blue duration-300 transition-all" />
            </>
          ) : (
            <>
              <LoginButton style="text-left" />
            </>
          )}
        </div>
      )}
      <div className="hidden mx-auto md:flex md:w-full items-center md:justify-around md:py-3 md:px-5 md:gap-8  md:text-gray text-sm">
        <div>
          <Link
            className="text-medium font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-600 to-indigo-700"
            to="/home"
          >
            LOST
            <span className="font-heading text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-700">
              FOUND
            </span>
          </Link>
        </div>

        {!isLoading && isAuthenticated ? (
          <>
            <NavbarLink
              path="/about"
              divStyle="hover:text-blue duration-300 transition-all"
              text={t("navbar.about")}
            />
            <NavbarLink
              path="/services"
              divStyle="hover:text-blue duration-300 transition-all"
              text={t("navbar.services")}
            />
            <NavbarLink
              path="/us"
              divStyle="hover:text-blue duration-300 transition-all"
              text={t("navbar.why_us")}
            />
            <NavbarLink
              path="/contact"
              divStyle="hover:text-blue duration-300 transition-all"
              text={t("navbar.contact")}
            />
            <div className="flex gap-3 items-center">
              <NavbarLink
                path="/profile"
                divStyle="hover:text-blue text-xl duration-300 transition-all"
                text={<FaUserCircle />}
              />
              <div>
                <Logout
                  icon={true}
                  style="hover:text-blue duration-300 transition-all text-xl"
                />
              </div>
            </div>
          </>
        ) : null}
        <div className="flex items-center">
          {!isLoading && !isAuthenticated && <LoginButton />}
        </div>
      </div>
    </div>
  );
}
export default Navbar;
