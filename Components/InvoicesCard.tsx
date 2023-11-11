import React from "react";
import BasicCard from "./BasicCard";
import InvoicesBarChart from "./charts/InvoicesBarChart";
import FormModal from "./FormModal";

const InvoicesCard = () => {
  return (
    <BasicCard
      title="Invoices owed to you"
      content={<InvoicesBarChart />}
      action={<FormModal />}
    />
  );
};

export default InvoicesCard;
