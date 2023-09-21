import * as React from "react";
import { useState, useContext, useEffect } from "react";
import { TodosContext } from "../contexts/TodosContext";
import Todo from "./Todo";

//uuid Library For Generate Unique IDs
import { v4 as uuidv4 } from "uuid";

//From MUI library
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import { Grid } from "@mui/material";

//Main Fn
export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [titleInput, setTitleInput] = useState("");
  const [displayTasksType, setDisplayTasksType] = useState("all"); //For filter tasks "ALL - COMPLETED - NOT COMPLETED"

  //Fn For Change Filter Tasks "ALL - COMPLETED - NOT COMPLETED"
  const toggleDisplayType = function (e) {
    setDisplayTasksType(e.target.value);
  };

  //Array of Completed Tasks
  const completedTasks = todos.filter((task) => {
    return task.isCompleted;
  });

  //Array of non-Completed Tasks
  const unCompletedTasks = todos.filter((task) => {
    return !task.isCompleted;
  });

  let tasksToBeRendered = todos; //default value is all tasks

  if (displayTasksType === "completed") {
    tasksToBeRendered = completedTasks;
  } else if (displayTasksType === "uncompleted") {
    tasksToBeRendered = unCompletedTasks;
  }

  //Create Every Singel Task
  const tasksMap = tasksToBeRendered.map((task) => {
    return <Todo key={task.id} task={task} />;
  });

  //get Tasks From local storage
  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todos")));
  }, [setTodos]);

  //Adding New Task
  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
    localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
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
            value={displayTasksType}
            onChange={toggleDisplayType}
            style={{ marginTop: "30px" }}
            exclusive
            aria-label="text alignment">
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="completed">Completed </ToggleButton>
            <ToggleButton value="uncompleted">Not Completed</ToggleButton>
          </ToggleButtonGroup>

          {/* ====== All Tasks ====== */}
          {tasksMap}
          {/* ====== All Tasks ====== */}

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
