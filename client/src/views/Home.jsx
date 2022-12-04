import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/Footer";
import Wallet3d from "../components/Wallet3d/Wallet3d";
import Banner from "../components/Banner/Banner";
import InfoBlock from "../components/info-block/InfoBlock";

export function Home() {
  const [lostTip, setLostTip] = useState(true);
  const [foundTip, setFoundTip] = useState(true);

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
      <div className="mt-5 flex flex-col md:flex-row md:items-center md:justify-center w-full bg-home2 bg-cover bg-no-repeat bg-center bg-opacity-5">
        <div className="hidden sm:flex h-[500px] relative sm:w-[450px] ">
          <Wallet3d />
        </div>
        <div className="font-sans flex flex-col gap-5 font-semibold ">
          <div className="flex flex-col gap-1  hover:scale-[1.02] transition-all duration-300">
            <p className=" text-xl md:text-3xl text-green">Lost your docs? </p>
            <p className="text-lg font-normal">
              Don't worry, we've got you covered. We are here to help you find
              your lost documents.
            </p>
            <Link
              to="/search"
              className="bg-green w-fit text-white px-3 py-2 rounded-md"
            >
              Find them
            </Link>
          </div>
          <div className="flex flex-col gap-1 hover:scale-[1.02] transition-all duration-300">
            <p className=" text-xl md:text-3xl text-blue">
              Found any documents?
            </p>
            <p className="text-lg font-normal">
              We are here to help you find the owner of the documents you found.
            </p>
            <Link
              to="/post"
              className="bg-blue w-fit text-white px-3 py-2 rounded-md "
            >
              Post them
            </Link>
          </div>
        </div>
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
