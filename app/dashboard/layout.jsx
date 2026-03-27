"use client"
import React, { useState } from 'react'
import Header from './_components/Header'
import SideNav from './_components/SideNav';
import VideoDataContext from '../_context/VideoDataContext';



function DashboardLayout({ children }) {
  const [videoData,setVideoData]=useState([]);
  return (
    <VideoDataContext.Provider value={{videoData,setVideoData}}>
    <div className="h-screen flex flex-col">

      {/* HEADER */}
      <Header />

      {/* BODY */}
      <div className="flex flex-1">

        {/* SIDEBAR */}
        <div className="hidden md:block w-64 bg-white border-r">
          <SideNav />
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 p-6 bg-gray-100">
          {children}
        </div>

      </div>
    </div>
    </VideoDataContext.Provider>
  );
}

export default DashboardLayout;