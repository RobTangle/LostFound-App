import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FiLogOut } from "react-icons/fi";

export const Logout = ({ icon, style }) => {
  const { logout } = useAuth0();

  return (
    <div className={style && style + " w-fit hover:cursor-pointer  "}>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          logout({ returnTo: window.location.origin });
        }}>
        {icon ? <FiLogOut /> : "Cerrar sesión"}
      </button>
    </div>
  );
};

export default Logout;
