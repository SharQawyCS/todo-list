import "./App.css";
import TodoList from "./components/TodoList";
import { TodosContext } from "./contexts/TodosContext";
import { useState } from "react";

import { createTheme, ThemeProvider } from "@mui/material";

//uuid Library For Generate Unique IDs
import { v4 as uuidv4 } from "uuid";

//Default Font & Colors //By MUI
const theme = createTheme({
  typography: {
    fontFamily: ["AlexFont"],
  },
  palette: {
    primary: { main: "#618264" },
    main: "#618264",
    seconed: "#79AC78",
    third: "#B0D9B1",
    fourth: "#D0E7D2",
  },
});

//Pre written Tasks
const intialTodos = [
  {
    id: uuidv4(),
    title: "Welcome To My Tasks",
    details: "Let's Learn How To Use",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "I am a completed task ",
    details: "I am details",
    isCompleted: true,
  },
  {
    id: uuidv4(),
    title: "I am a uncompleted task",
    details: "You can use right buttons to edit and delete task",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "I am a task without details, Thanks For Using My Tasks",
    details: "",
    isCompleted: true,
  },
];

function App() {
  const [todos, setTodos] = useState(intialTodos);

  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#79AC78",
          minHeight: "100vh",
        }}>
        <TodosContext.Provider value={{ todos: todos, setTodos: setTodos }}>
          <TodoList />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
