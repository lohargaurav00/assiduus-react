import React from "react";
import BasicCard from "./BasicCard";
import Linechart from "./Linechart";

const LinechartCard = () => {
  return <BasicCard title="Checking account" content={<Linechart/>} />;
};

export default LinechartCard;
