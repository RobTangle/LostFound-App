import React, { useState } from "react";
import NavBar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/Footer";
import Wallet3d from "../components/Wallet3d/Wallet3d";
export function Home() {
  const [showLostTip, setShowLostTip] = useState(true);
  const [showFoundTip, setShowFoundTip] = useState(true);
  return (
    <div>
      <NavBar />
      <div className="h-[430px] invisible sm:visible mx-auto">
        <Wallet3d />
      </div>
      <section className="bg-white">
        <div className="container px-6 py-10 mx-auto">
          <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
            <div className="lg:flex lg:border-2 lg:rounded-lg items-center">
              <img
                className="object-cover w-full h-56 rounded-lg lg:w-64"
                src="https://res.cloudinary.com/dyzge4vha/image/upload/v1669272573/lost-wallet-e1496852942717_fxgvyo.jpg"
                alt=""
              />

              <div className="flex flex-col justify-between py-1 lg:mx-6 font-extralight">
                <p className="text-4xl text-slate-800 hover:text-slate-600 hover:cursor-pointer">
                  Did you find documents and want to publish them?
                </p>
              </div>
            </div>

            <div className="lg:flex lg:border-2 lg:rounded-lg items-center">
              <img
                className="object-cover w-full h-56 rounded-lg lg:w-64"
                src="https://res.cloudinary.com/dyzge4vha/image/upload/v1669272574/Lost-or-stolen-wallet-or-purse_x0vtwq.png"
                alt=""
              />

              <div className="flex flex-col justify-between py-1 lg:mx-6 font-extralight">
                <p className="text-4xl text-slate-800 hover:text-slate-600 hover:cursor-pointer">
                  Lost your documents? Here are some tips that will help you
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
