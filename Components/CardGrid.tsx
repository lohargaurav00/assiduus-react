import React from 'react'
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import BasicCard from "@/components/BasicCard";

const CardGrid = () => {
  return (
    <Box
    sx={{
      flexGrow: 1,
      margin: "40px 40px 40px 280px",
      height: "calc(100vh - 126px)",
      maxWidth: "100%",
    }}
  >
    <Grid container spacing={4} height={"100%"}>
      <Grid xs={6}>
        <BasicCard />
      </Grid>
      <Grid xs={6}>
        <BasicCard />
      </Grid>
      <Grid xs={6}>
        <BasicCard />
      </Grid>
      <Grid xs={6}>
        <BasicCard />
      </Grid>
    </Grid>
  </Box>
  )
}

export default CardGrid