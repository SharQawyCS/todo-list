import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Typography, Button } from "@mui/material";

export default function Todo() {
  return (
    <>
      <Card sx={{ minWidth: 275, backgroundColor: "pink", color: "white" }}>
        <CardContent>
          <Typography variant="h2">First Task</Typography>
        </CardContent>
      </Card>
    </>
  );
}
