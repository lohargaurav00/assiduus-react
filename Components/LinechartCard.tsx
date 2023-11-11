import React from "react";
import BasicCard from "./BasicCard";
import Linechart from "./Linechart";
import Dropdown from "./MonthDropdown";

const LinechartCard = () => {
  return (
    <BasicCard
      title="Checking account"
      content={<Linechart />}
      action={<Dropdown />}
    />
  );
};

export default LinechartCard;
