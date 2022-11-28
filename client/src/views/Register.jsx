import React from "react";
import Navbar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/Footer";
import { RegisterForm } from "../components/RegisterForm/RegisterForm";

export function Register() {
  return (
    <div>
      <Navbar />
      <div className="max-auto relative">
        <RegisterForm />
      </div>
      <Footer />
    </div>
  );
}
