import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import NavBar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/Footer";
import Wallet3d from "../components/Wallet3d/Wallet3d";

export function Home() {
  const [lostTip, setLostTip] = useState(true);
  const [foundTip, setFoundTip] = useState(true);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleLostTip = () => {
    setFoundTip(true);
    setLostTip(!lostTip);
  };
  const handleFoundTip = () => {
    setLostTip(true);
    setFoundTip(!foundTip);
  };
  return (
    <div>
      <NavBar />
      <div className="hidden sm:block sm:mx-auto sm:h-[550px]">
        <Wallet3d />
      </div>
      <div className="block grid mx-auto text-center mx-12 rounded-xl border-2 border-slate-200 sm:hidden">
        <div
          className="p-8 hover:text-emerald-600 hover:cursor-pointer hover:scale-125"
          onClick={() => navigate("/search")}
        >
          <img
            className="w-[150px] mx-auto"
            src="https://res.cloudinary.com/dyzge4vha/image/upload/v1669509058/Lowpoly_Magnifying_Glass_-_Copy_1-1525x709_1_a91wql.png"
            alt=""
          />
          <h1 className="font-semibold text-2xl">SEARCH</h1>
        </div>
        <div className="border-2 border-slate-200 w-1/2 mx-auto"></div>
        <div
          className="p-8 hover:text-indigo-600 hover:cursor-pointer hover:scale-125"
          onClick={() => navigate("/post")}
        >
          <img
            className="w-[150px] mx-auto"
            src="https://res.cloudinary.com/dyzge4vha/image/upload/v1669509058/Lowpoly_Magnifying_Glass_-_Copy_1-1525x709_3_qc1wed.png"
            alt=""
          />
          <h1 className="font-semibold text-2xl">POST</h1>
        </div>
      </div>
      <section className="bg-white">
        <div className="container px-6 py-10 mx-auto">
          <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
            <div className="lg:flex lg:border-2 border-emerald-600 lg:rounded-lg items-center">
              <img
                className="object-cover w-full h-56 rounded-lg lg:w-60 lg:h-full"
                src="https://res.cloudinary.com/dyzge4vha/image/upload/v1669272574/Lost-or-stolen-wallet-or-purse_x0vtwq.png"
                alt=""
              />

              <div className="flex flex-col justify-between py-1 lg:mx-6 font-extralight">
                <p
                  className="text-4xl text-slate-800 hover:text-slate-600 hover:cursor-pointer"
                  onClick={handleLostTip}
                >
                  {t("home.lostTip")}
                </p>
              </div>
            </div>

            <div className="lg:flex lg:border-2 border-indigo-500 lg:rounded-lg items-center">
              <img
                className="object-cover w-full h-56 rounded-lg lg:w-60 lg:h-full"
                src="https://res.cloudinary.com/dyzge4vha/image/upload/v1669272573/lost-wallet-e1496852942717_fxgvyo.jpg"
                alt=""
              />

              <div className="flex flex-col justify-between py-1 lg:mx-6 font-extralight">
                <p
                  className="text-4xl text-slate-800 hover:text-slate-600 hover:cursor-pointer"
                  onClick={handleFoundTip}
                >
                  {t("home.foundTip")}
                </p>
              </div>
            </div>
          </div>
          <div
            hidden={foundTip}
            className="border border-indigo-500 mt-4 rounded-lg p-2"
          >
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse,
              aspernatur? Minus dolorem in quis, officia cupiditate quibusdam
              ratione officiis, eaque aspernatur possimus nobis. Blanditiis
              natus, ipsa sit harum expedita ducimus!
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse,
              aspernatur? Minus dolorem in quis, officia cupiditate quibusdam
              ratione officiis, eaque aspernatur possimus nobis. Blanditiis
              natus, ipsa sit harum expedita ducimus!
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse,
              aspernatur? Minus dolorem in quis, officia cupiditate quibusdam
              ratione officiis, eaque aspernatur possimus nobis. Blanditiis
              natus, ipsa sit harum expedita ducimus!
            </p>
          </div>
          <div
            hidden={lostTip}
            className="border border-emerald-500 mt-4 rounded-lg p-2"
          >
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse,
              aspernatur? Minus dolorem in quis, officia cupiditate quibusdam
              ratione officiis, eaque aspernatur possimus nobis. Blanditiis
              natus, ipsa sit harum expedita ducimus!
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse,
              aspernatur? Minus dolorem in quis, officia cupiditate quibusdam
              ratione officiis, eaque aspernatur possimus nobis. Blanditiis
              natus, ipsa sit harum expedita ducimus!
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse,
              aspernatur? Minus dolorem in quis, officia cupiditate quibusdam
              ratione officiis, eaque aspernatur possimus nobis. Blanditiis
              natus, ipsa sit harum expedita ducimus!
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
