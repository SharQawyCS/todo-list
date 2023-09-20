import * as React from "react";
import { v4 as uuidv4 } from "uuid";

import Todo from "./Todo";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Divider from "@mui/material/Divider";

import { Grid } from "@mui/material";

import TextField from "@mui/material/TextField";

import { useState } from "react";

const intialTodos = [
  {
    id: uuidv4(),
    title: "Read A book",
    details: "My Best Book",
    isCompleted: true,
  },
  {
    id: uuidv4(),
    title: "seconed Task ",
    details: "My LoL Task",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Not A Task ",
    details: "I am a JOKE",
    isCompleted: false,
  },
];

export default function TodoList() {
  const [todos, setTodos] = useState(intialTodos);
  const [titleInput, setTitleInput] = useState("");

  const tasksMap = todos.map((task) => {
    return (
      <Todo key={task.id} task={task} handleIscompleted={handleIscompleted} />
    );
  });

  function handleIscompleted(taskId) {
    const updateTask = todos.map((task) => {
      if (task.id === taskId) {
        task.isCompleted = !task.isCompleted;
      }
      return task;
    });

    setTodos(updateTask);
  }
  function handleAddClick() {
    setTodos([
      ...todos,
      {
        id: uuidv4(),
        title: titleInput,
        details: "",
        isCompleted: false,
      },
    ]);
    setTitleInput("");
  }
  return (
    <Container maxWidth="sm" sx={{ margin: "50px 0" }}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography
            variant="h3"
            sx={{ fontWeight: "400", margin: "10px 0 20px" }}>
            My Tasks
          </Typography>
          <Divider />
          {/* ---Toggle Buttons--- */}
          <ToggleButtonGroup
            style={{ marginTop: "30px" }}
            exclusive
            aria-label="text alignment">
            <ToggleButton value="left">All</ToggleButton>
            <ToggleButton value="center">Completed </ToggleButton>
            <ToggleButton value="right">Not Completed</ToggleButton>
          </ToggleButtonGroup>
          {tasksMap}
          {/* <InputTask /> */}
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "20px",
              color: "white",
            }}>
            <TextField
              value={titleInput}
              onChange={(e) => {
                setTitleInput(e.target.value);
              }}
              sx={{ width: "100%" }}
              id="outlined-basic"
              label="Task name"
              variant="outlined"
            />

            <Button
              onClick={handleAddClick}
              sx={{
                backgroundColor: "main",
                height: "56px",
                marginLeft: "10px",
              }}
              variant="contained">
              Add
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
