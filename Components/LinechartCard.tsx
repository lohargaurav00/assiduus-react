import React from "react";
import BasicCard from "./BasicCard";
import Linechart from "./Linechart";
import MonthDropdown from "./MonthDropdown";
import ManageDropdown from "./ManageDropdown";

const LinechartCard = () => {
  return (
    <BasicCard
      title="Checking account"
      content={<Linechart />}
      action={
        <div className="inline-flex gap-2">
          <ManageDropdown />
          <MonthDropdown />
        </div>
      }
    />
  );
};

export default LinechartCard;
