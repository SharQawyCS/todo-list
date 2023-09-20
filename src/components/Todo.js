import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Unstable_Grid2";
import { Typography, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
// Icons =>
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export default function Todo() {
  return (
    <>
      <Card
        sx={{
          minWidth: 275,
          marginTop: 5,
          backgroundColor: "pink",
          color: "white",
        }}>
        <CardContent>
          <Grid container spacing={2} sx={{ background: "#c1ddffbf" }}>
            <Grid xs={8}>
              <Typography variant="h5" sx={{ textAlign: "left" }}>
                First Task
              </Typography>
            </Grid>
            <Grid xs={4} display="flex" justifyContent="space-between">
              <IconButton
                aria-label="delete"
                sx={{
                  color: "green",
                  backgroundColor: "white",
                  border: "solid green 3px",
                }}>
                <CheckIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                sx={{
                  color: "#1b73e8de",
                  backgroundColor: "white",
                  border: "solid #1b73e8de 3px",
                }}>
                <EditOutlinedIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                sx={{
                  color: "#ff0f0d",
                  backgroundColor: "white",
                  border: "solid #ff0f0d 3px",
                }}>
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
