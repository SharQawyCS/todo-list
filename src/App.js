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
