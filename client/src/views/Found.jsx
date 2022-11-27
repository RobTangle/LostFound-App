import React from "react";
import NavBar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/Footer";
import PostForm from "../components/PostForm/PostForm";

export function Found() {
  return (
    <div>
      <NavBar />
      <div className="mx-auto relative">
        <PostForm />
      </div>
      <Footer />
    </div>
  );
}
