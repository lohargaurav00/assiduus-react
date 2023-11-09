"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import CardGrid from "@/components/CardGrid";

const page = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <CardGrid />
    </>
  );
};

export default page;
