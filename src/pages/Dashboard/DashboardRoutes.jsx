import React, { useContext } from "react";
import Nav from "../../components/Nav";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoute";
import Account from "../Account/Account";
import Dashboard from "./Dashboard";
import Projects from "../Projects/Projects";
import ProjectsContextProvider from "../../store/projects-context";
import NotesContextProvider from "../../store/notes-context";
import ProjectView from "../Projects/ProjectView";
import Notes from "../Notes/Notes";
import Faq from "../FAQ/Faq";
import Footer from "../../components/Footer";

const DashboardRoutes = () => {
  return (
    <ProjectsContextProvider>
      <NotesContextProvider>
        <section className="w-full relative flex ">
          <Nav />
          <div className="min-h-screen relative flex-auto sm:ml-14 md:ml-48 pb-12">
            
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/account" element={<Account />} />
              <Route path="/projects/*" element={<Projects />} />
              <Route
                path="/projects/:projectIDparam"
                element={<ProjectView />}
              />
              <Route path="/notes" element={<Notes />} />
              <Route path="/faq" element={<Faq />} />
            </Routes>
            <div className="absolute w-full left-0 bottom-0 mb-10 sm:mb-0 opacity-50 sm:opacity-100">
            <Footer />
            </div>
          </div>
        </section>
      </NotesContextProvider>
    </ProjectsContextProvider>
  );
};

export default DashboardRoutes;
