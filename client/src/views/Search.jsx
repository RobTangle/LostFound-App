import React, { useState } from "react";
import NavBar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/Footer";
import SearchForm from "../components/SearchForm/SearchForm";

export function Search() {
  const [search, setSearch] = useState({
    name: "",
    dni: "",
    country: "",
    date: "",
  });
  return (
    <div>
      <NavBar />
      <div className="mx-auto">
        <SearchForm />
      </div>
      <Footer />
    </div>
  );
}
