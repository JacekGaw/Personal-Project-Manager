import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/auth-context";
import { NavLink } from "react-router-dom";
import Button from "./UI/Button";
import NavItem from "./NavItem";

const Nav = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="group z-50 w-full sm:h-screen flex flex-row sm:flex-col items-center transition-all duration-200 fixed bottom-0 sm:top-0 left-0 bg-darkerjeans sm:w-14 md:w-48">
      <h2 className="hidden sm:block font-bold sm:w-full text-xl sm:mb-10 text-center sm:pt-2">
        <span className="text-jeans hidden md:inline-flex">Per</span>
        <span className="text-vibrantgold hidden md:inline-flex">Project</span>
        <span className="text-jeans md:hidden">P</span>
        <span className="text-vibrantgold md:hidden">P</span>
      </h2>
      <ul className="flex sm:flex-col flex-row gap-2 sm:pl-2 text-slate-200 font-[300] w-full">
        <NavItem linkTo={"/dashboard"} label={"Dashboard"} icon={"home"}/>
        <NavItem linkTo={"/dashboard/account"} label={"Account"} icon={"account_circle"} />
        <NavItem linkTo={"/dashboard/projects"} label={"Projects"} icon={"inventory_2"} />
        <NavItem linkTo={"/dashboard/notes"} label={"Notes"} icon={"note_stack"} />
        <NavItem linkTo={"/dashboard/faq"} label={"FAQ"} icon={"help"} />
      </ul>
      <button
        className="material-symbols-outlined sm:absolute sm:bottom-0 text-white p-2 sm:mb-1"
        onClick={() => {
          logout();
        }}
      >
        logout
      </button>
    </nav>
  );
};

export default Nav;
