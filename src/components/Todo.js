import React from "react";

//From MUI library
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Unstable_Grid2";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
// Icons
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

//Main ƒn
export default function Todo({ task, handleIscompleted }) {
  return (
    <Card
      className="todo-card"
      sx={{
        minWidth: 275,
        marginTop: "20px",
        backgroundColor: "main",
        color: "white",
      }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid xs={6} sm={8}>
            <Typography variant="h5" sx={{ textAlign: "left" }}>
              {task.title}
            </Typography>
            <Typography variant="h6" sx={{ textAlign: "left" }}>
              {task.details}
            </Typography>
          </Grid>
          {/* ====== Buttons Grid ====== */}
          <Grid
            xs={6}
            sm={4}
            display="flex"
            justifyContent="space-between"
            alignItems="center">
            {/* Completed Button */}
            <IconButton
              onClick={() => {
                handleIscompleted(task.id);
              }}
              sx={{
                color: "seconed",
                backgroundColor: task.isCompleted ? "rgba(0,0,0,.6)" : "white",
                border: "solid seconed 1px",
              }}>
              <CheckIcon />
            </IconButton>
            {/* Edit Button */}
            <IconButton
              sx={{
                color: "third",
                backgroundColor: "white",
                border: "solid third 1px",
              }}>
              <EditOutlinedIcon />
            </IconButton>
            {/* Delete Button */}
            <IconButton
              sx={{
                color: "fourth",
                backgroundColor: "white",
                border: "solid fourth 1px",
              }}>
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
