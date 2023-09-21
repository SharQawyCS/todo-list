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
  let tasksToBeRendered = todos; //default value is all tasks

  //Array of Completed Tasks
  const completedTasks = todos.filter((task) => {
    return task.isCompleted;
  });

  //Array of non-Completed Tasks
  const unCompletedTasks = todos.filter((task) => {
    return !task.isCompleted;
  });

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
    let tasksStoraged = localStorage.getItem("todos");
    if (tasksStoraged != null) {
      setTodos(JSON.parse(tasksStoraged));
    }
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
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography
            variant="h3"
            sx={{ fontWeight: "400", margin: "10px 0 " }}>
            My Tasks
          </Typography>
          <Divider />
          {/* ---Toggle Buttons--- */}
          <ToggleButtonGroup
            value={displayTasksType}
            onChange={toggleDisplayType}
            style={{ margin: "10px 0 " }}
            exclusive
            aria-label="text alignment"
            color="primary">
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="completed">Completed </ToggleButton>
            <ToggleButton value="uncompleted">Not Completed</ToggleButton>
          </ToggleButtonGroup>

          {/* ====== All Tasks ====== */}
          <div style={{ height: "60vh", overflow: "scroll" }}>{tasksMap}</div>

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
              disabled={titleInput === ""}
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
      <span
        style={{
          display: "block",
          margin: "10px",
          letterSpacing: "2px",
          color: "rgb(4 62 2)",
        }}>
        Made With Love In EGYPT 💚🇪🇬
      </span>
    </Container>
  );
}
