import { createContext, useState } from "react";
import MySnackBar from "../components/MySnackBar";

export const SnackBarContext = createContext({});

export const SnackBarProvider = ({ children }) => {
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState(
    "Write your message in TodoList.js "
  );

  function showHideSnackBar(message) {
    setSnackBarOpen(true);
    setSnackBarMessage(message);
    setTimeout(() => {
      setSnackBarOpen(false);
    }, 1500);
  }

  return (
    <SnackBarContext.Provider value={{ showHideSnackBar }}>
      <MySnackBar open={snackBarOpen} message={snackBarMessage} />
      {children}
    </SnackBarContext.Provider>
  );
};
