import React from "react";
import Nav from "../../components/Nav";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoute";
import Account from "../Account/account";
import Dashboard from "./Dashboard";

const DashboardRoutes = ({ children }) => {
  return (
    <section className="w-full relative flex">
      <Nav />
      <div className="min-h-screen flex-auto ml-64">
        <Routes>
          <Route path="/" element={<Dashboard />}/>
          <Route path="/dashboard/account" element={<Account />} />
        </Routes>
      </div>
    </section>
  );
};

export default DashboardRoutes;
