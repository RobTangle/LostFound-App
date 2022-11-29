import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/Footer";
import Wallet3d from "../components/Wallet3d/Wallet3d";
import Banner from "../components/Banner/Banner";
import InfoBlock from "../components/info-block/InfoBlock";

export function Home() {
  const [lostTip, setLostTip] = useState(true);
  const [foundTip, setFoundTip] = useState(true);

  const navigate = useNavigate();

  const handleLostTip = () => {
    setFoundTip(true);
    setLostTip(!lostTip);
  };
  const handleFoundTip = () => {
    setLostTip(true);
    setFoundTip(!foundTip);
  };
  const homeVariant = {
    hidden: {
      opacity: 0.3,
    },
    visible: {
      opacity: 1,

      transition: {
        type: "spring",
        delay: 0.3,
        stiffness: 120,
      },
    },
  };
  return (
    <div>
      <NavBar />
      <div className="hidden sm:block sm:mx-auto h-[500px] relative sm:h-[450px] ">
        <Wallet3d />
      </div>
      <Banner
        leftImage={true}
        homeVariant={homeVariant}
        leftSrc="https://res.cloudinary.com/dfbxjt69z/image/upload/v1669652847/lostfound/77-removebg-preview_kezrun.png"
      />
      <InfoBlock
        handleLostTip={handleLostTip}
        handleFoundTip={handleFoundTip}
        lostTip={lostTip}
        foundTip={foundTip}
        homeVariant={homeVariant}
      />
      {/* <div className=" grid  text-center mx-12 rounded-xl border-2 border-slate-200 sm:hidden">
        <div
          className="p-8 hover:text-emerald-600 hover:cursor-pointer hover:scale-125"
          onClick={() => navigate("/search")}>
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
          onClick={() => navigate("/post")}>
          <img
            className="w-[150px] mx-auto"
            src="https://res.cloudinary.com/dyzge4vha/image/upload/v1669509058/Lowpoly_Magnifying_Glass_-_Copy_1-1525x709_3_qc1wed.png"
            alt=""
          />
          <h1 className="font-semibold text-2xl">POST</h1>
        </div>
      </div> */}
      <Footer />
    </div>
  );
}
