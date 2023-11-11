import React from "react";
import BasicCard from "./BasicCard";
import AccountTable from "./charts/AccountTable";

const AccountTableCard = () => {
  return <BasicCard title="Account Watchlist" content={<AccountTable/>} />;
};

export default AccountTableCard;
