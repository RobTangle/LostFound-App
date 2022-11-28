import React from "react";
import { MagnifyingGlass } from "react-loader-spinner";

export default function Spinner() {
  return (
    <MagnifyingGlass
      visible={true}
      height="80"
      width="80"
      ariaLabel="MagnifyingGlass-loading"
      wrapperStyle={{}}
      wrapperClass="MagnifyingGlass-wrapper"
      glassColor="#c0efff"
      color="#2676fc"
    />
  );
}
