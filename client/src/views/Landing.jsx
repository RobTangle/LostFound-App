import React from "react";
import LangButton from "../components/lang-button";
import LoginButton from "../components/login-button";

export function Landing() {
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <img
        className="h-44 mx-auto"
        src="https://res.cloudinary.com/dfbxjt69z/image/upload/v1669137344/lostfound/LostFound_1_nov4jl.png"
        alt=""
      />
      <LangButton/>
      <LoginButton />
    </div>
  );
}
