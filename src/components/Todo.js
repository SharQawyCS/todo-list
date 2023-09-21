import React from "react";
import { useContext } from "react";
import { TodosContext } from "../contexts/TodosContext";

//From MUI library
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Unstable_Grid2";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";

//Dialog from MUI
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// Icons
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { AlternateEmail } from "@mui/icons-material";

//Main ƒn
export default function Todo({ task }) {
  const { todos, setTodos } = useContext(TodosContext);

  //Update State Of The Task
  //Toggle Checked
  function handleIsCompleted(taskId) {
    const updateTask = todos.map((task) => {
      if (task.id === taskId) {
        task.isCompleted = !task.isCompleted;
      }
      return task;
    });
    setTodos(updateTask);
  }

  //Delete Task ƒn
  //State For Delete Task
  const [open, setOpen] = React.useState(false);
  const handleDelete = () => {
    setOpen(false);
    alert("Deleted HHH");
  };

  return (
    <>
      {/* Delete Modal || Dialog */}
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Delete The Task?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you selected Delete you can not prevent changed and the task will
            be deleted forever, Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}>
            Close
          </Button>
          <Button sx={{ color: "#ff0e0e" }} onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

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
                  handleIsCompleted(task.id);
                }}
                sx={{
                  color: "seconed",
                  backgroundColor: task.isCompleted
                    ? "rgba(0,0,0,.6)"
                    : "white",
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
                onClick={() => {
                  setOpen(true);
                }}
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
    </>
  );
}
