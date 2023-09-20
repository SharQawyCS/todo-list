import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: ["AlexFont"],
  },
  palette: {
    primary: { main: "#618264" },
    main: "#618264", // your primary color
    seconed: "#79AC78", // your secondary color
    third: "#B0D9B1", // your secondary color
    fourth: "#D0E7D2", // your secondary color
  },
});

function App() {
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
          fontFamily: "AlexFont",
        }}>
        <TodoList />
      </div>
    </ThemeProvider>
  );
}

export default App;
