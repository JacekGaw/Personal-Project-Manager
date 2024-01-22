import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/auth-context";
import { NavLink } from "react-router-dom";
import Button from "./UI/Button";

const Nav = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className=" h-screen flex flex-col justify-between items-start fixed top-0 left-0 w-48 bg-darkerjeans">
      <h2 className="font-bold w-full text-xl mb-10 text-center mt-2">
        <span className="text-jeans">Per</span>
        <span className="text-vibrantgold">Project</span>
      </h2>
      <ul className="h-screen flex flex-col gap-2 pl-2 text-slate-200 font-[300] w-full">
        <li className="hover:bg-jeans transition-all duration-200  w-full rounded-l-md">
          <NavLink exact to="/dashboard" className={({isActive}) =>
          isActive ? "block w-full py-2 px-2 bg-jeans rounded-l-md" : "block w-full py-2 px-2"}>Dashboard</NavLink>
        </li>
        <li className="hover:bg-jeans transition-all duration-200  w-full rounded-l-md">
          <NavLink exact to="/dashboard/account" className={({isActive}) =>
          isActive ? "block w-full py-2 px-2 bg-jeans rounded-l-md" : "block w-full py-2 px-2"}>Account</NavLink>
          
        </li>
      </ul>
      <Button >Log Out</Button>
    </nav>
  );
};

export default Nav;
