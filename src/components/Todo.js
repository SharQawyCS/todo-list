import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Unstable_Grid2";
import { Typography, Button } from "@mui/material";

export default function Todo() {
  return (
    <>
      <Card sx={{ minWidth: 275, backgroundColor: "pink", color: "white" }}>
        <CardContent>
          <Grid container spacing={2} sx={{background: "green"}}>
            <Grid xs={6} md={8} >
            </Grid>
            <Grid xs={6} md={4}>
              <Typography variant="h4">First Task</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
