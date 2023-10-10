import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const Dashboard = () => {
  return (
    <section className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />
        <div className="flex flex-col flex-grow px-4  overflow-y-auto bg-gray-100">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
