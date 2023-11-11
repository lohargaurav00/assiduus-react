import React from "react";
import BasicCard from "./BasicCard";
import TotalCashFlowChart from "./charts/TotalCashFlowChart";

const TotalCashFlowCard = () => {
  return (
    <BasicCard
      title="Total cash flow"
      content={<TotalCashFlowChart />}
      action={
        <div className="inline-flex gap-4 font-bold text-md text-slate-700 justify-center items-center mr-2">
          <span className="inline-flex gap-2 justify-center items-center">
            <span
              className="h-5 w-5 rounded-md"
              style={{
                backgroundColor: "var(--green-secondary)",
              }}
            />
            In
          </span>
          <span className="inline-flex gap-2 justify-center items-center">
            <span
              className="h-5 w-5 rounded-md"
              style={{
                backgroundColor: "var(--green-primary)",
              }}
            />
            Out
          </span>
        </div>
      }
    />
  );
};

export default TotalCashFlowCard;
