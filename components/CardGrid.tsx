"use client";
import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import LinechartCard from "./LinechartCard";
import AccountTableCard from "./AccountTableCard";
import InvoicesCard from "./InvoicesCard";
import TotalCashFlowCard from "./TotalCashFlowCard";

const CardGrid = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        margin: "30px 30px 30px 270px",
        height: "calc(100vh - 1236px)",
        maxWidth: "100%",
      }}
    >
      <Grid container spacing={3} height={"100%"}>
        <Grid xs={6}>
          <LinechartCard />
        </Grid>
        <Grid xs={6}>
          <InvoicesCard />
        </Grid>
        <Grid xs={6}>
          <TotalCashFlowCard />
        </Grid>
        <Grid xs={6}>
          <AccountTableCard />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CardGrid;
