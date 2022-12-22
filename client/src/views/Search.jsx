import React, { useState } from "react";
import { useSelector } from "react-redux";
import NavBar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/Footer";
import { SearchComp } from "../components/SearchComp/SearchComp";

export function Search() {
  const results = useSelector((state) => state.post.searchResults?.results);
  const [search, setSearch] = useState({
    name: "",
    dni: "",
    country: "",
    date: "",
  });
  return (
    <div>
      <NavBar />
      <div className="mx-auto relative">
        <SearchComp />
      </div>
      <Footer />
    </div>
  );
}
