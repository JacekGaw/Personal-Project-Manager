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

const DashboardRoutes = () => {
  return (
    <ProjectsContextProvider>
      <NotesContextProvider>
        <section className="w-full relative flex">
          <Nav />
          <div className="min-h-screen flex-auto ml-48">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/account" element={<Account />} />
              <Route path="/projects/*" element={<Projects />} />
              <Route
                path="/projects/:projectIDparam"
                element={<ProjectView />}
              />
              <Route path="/notes/*" element={<Notes />} />
            </Routes>
          </div>
        </section>
      </NotesContextProvider>
    </ProjectsContextProvider>
  );
};

export default DashboardRoutes;
