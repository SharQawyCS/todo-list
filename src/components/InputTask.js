import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { Grid } from "@mui/material";


export default function InputTask() {
  return (
    <Grid
      sx={{
        display: "flex",
        alignItems: "center",
        marginTop: "20px",
        color: "white",
      }}>
      <TextField
        sx={{ width: "100%" }}
        id="outlined-basic"
        label="Task name"
        variant="outlined"
      />

      <Button sx={{ backgroundColor:"main", height: "56px", marginLeft: "10px" }} variant="contained">
        Add
      </Button>
    </Grid>
  );
}
