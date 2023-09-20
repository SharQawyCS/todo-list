import * as React from "react";
import Todo from "./Todo";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Divider from "@mui/material/Divider";
//? Icons =>

export default function TodoList() {
  return (
    <Container maxWidth="md">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h3">My Tasks</Typography>
          <Divider />
          {/* ---Toggle Buttons--- */}
          <ToggleButtonGroup
            style={{ marginTop: "30px" }}
            // value={alignment}
            exclusive
            // onChange={handleAlignment}
            aria-label="text alignment">
            <ToggleButton value="left">All</ToggleButton>
            <ToggleButton value="center">Completed </ToggleButton>
            <ToggleButton value="right">Not Completed</ToggleButton>
          </ToggleButtonGroup>
          <Todo />
          <Todo />
          <Todo />
        </CardContent>
      </Card>
    </Container>
  );
}
