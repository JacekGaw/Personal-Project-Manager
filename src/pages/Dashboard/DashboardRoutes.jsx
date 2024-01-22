import React from "react";
import Nav from "../../components/Nav";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoute";
import Account from "../Account/account";
import Dashboard from "./Dashboard";

const DashboardRoutes = () => {
  return (
    <section className="w-full relative flex">
      <Nav />
      <div className="min-h-screen flex-auto ml-48">
        <Routes>
          <Route path="/" element={<Dashboard />}/>
          <Route path="/account" element={<Account />} />
        </Routes>
      </div>
    </section>
  );
};

export default DashboardRoutes;
