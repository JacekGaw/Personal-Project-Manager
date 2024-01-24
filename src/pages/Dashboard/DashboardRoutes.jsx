import React, {useContext} from "react";
import Nav from "../../components/Nav";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoute";
import Account from "../Account/Account";
import Dashboard from "./Dashboard";
import Projects from "../Projects/Projects";
import ProjectsContextProvider from "../../store/projects-context";

const DashboardRoutes = () => {
  return (
    <ProjectsContextProvider >
    <section className="w-full relative flex">
      <Nav />
      <div className="min-h-screen flex-auto ml-48">

        <Routes>
          <Route path="/" element={<Dashboard />}/>
          <Route path="/account" element={<Account />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </div>
    </section>
    </ProjectsContextProvider>
  );
};

export default DashboardRoutes;
