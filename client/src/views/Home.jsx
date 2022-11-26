import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import NavBar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/Footer";
import Wallet3d from "../components/Wallet3d/Wallet3d";

export function Home() {
  const [lostTip, setLostTip] = useState(true);
  const [foundTip, setFoundTip] = useState(true);
  const { t } = useTranslation();

  return (
    <div>
      <NavBar />
      <div className="invisible sm:visible mx-auto">
        <Wallet3d />
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
                  onClick={() => setLostTip(!lostTip)}
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
                  onClick={() => setFoundTip(!foundTip)}
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
