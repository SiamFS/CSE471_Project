import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import Navbar from "../components/navbar";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-grow mt-[80px] md:mt-[40px]"> 
        <Sidebar />
        <main className="flex-grow p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;