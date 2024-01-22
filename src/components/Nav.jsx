import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/auth-context";
import { NavLink } from "react-router-dom";

const Nav = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="w-auto min-h-screen fixed top-0 w-64 bg-jeans">
      <ul className="flex flex-col py-5 px-2">
        <NavLink to="/">Personal Manager</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/account">Account</NavLink>
      </ul>
    </nav>
  );
};

export default Nav;
