import React, { useState } from "react";
import { useContext } from "react";
import { TodosContext } from "../contexts/TodosContext";
import { SnackBarContext } from "../contexts/SnackBarContext";

//From MUI library
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Unstable_Grid2";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";

//Dialog from MUI
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// Icons
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

//Main ƒn Starting
export default function Todo({ task }) {
  const { todos, setTodos } = useContext(TodosContext);
  const { showHideSnackBar } = useContext(SnackBarContext);

  //Toggle Checked Completed
  function handleIsCompleted(taskId) {
    const updatedTaskMapForCheck = todos.map((task) => {
      if (task.id === taskId) {
        if (task.isCompleted) {
          showHideSnackBar("Task Added To Not Completed");
        } else {
          showHideSnackBar("Task Added To Completed");
        }
        task.isCompleted = !task.isCompleted;
      }
      return task;
    });
    setTodos(updatedTaskMapForCheck);
    //Save Tasks To Local Storage After Edit Anything
    localStorage.setItem("todos", JSON.stringify(updatedTaskMapForCheck));
  }

  //State For Edit Task => Edit DIALOG
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const handleOpeEditDialog = () => {
    setOpenEditDialog(true);
    setSubmitBtn(true); //To Ensure That submit BTN Is Disable
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };
  //This Fn toggle SUBMIT BTN enabled or disabled
  const [submitBtn, setSubmitBtn] = useState(true);

  //Edit Task ƒn
  const [updatedTask, setUpdatedTask] = useState({
    title: task.title,
    details: task.details,
  });
  function handleEdit(taskId) {
    showHideSnackBar("Task Edited Successfully");
    const updatedTasksMapForEdit = todos.map((task) => {
      if (task.id === taskId) {
        task.title = updatedTask.title;
        task.details = updatedTask.details;
      }
      return task;
    });
    setTodos(updatedTasksMapForEdit);
    handleCloseEditDialog();
    //Save Tasks To Local Storage After Edit Anything
    localStorage.setItem("todos", JSON.stringify(updatedTasksMapForEdit));
  }

  //State For Delete Task => Delete DIALOG
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  //Delete Task ƒn
  const handleDelete = (taskId) => {
    showHideSnackBar("Task Deleted Successfully");
    setOpenDeleteDialog(false);
    const updatedTasksFilterForDelete = todos.filter((task) => {
      if (task.id === taskId) {
        return false;
      } else {
        return true;
      }
    });
    setTodos(updatedTasksFilterForDelete);
    //Save Tasks To Local Storage After Edit Anything
    localStorage.setItem("todos", JSON.stringify(updatedTasksFilterForDelete));
  };

  return (
    <>
      {/* Edit Modal || Dialog */}
      <Dialog open={openEditDialog}>
        <DialogTitle>Edit Task Contnet</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit your task info and press SUBMIT.
          </DialogContentText>
          <TextField
            sx={{ margin: "30px 0 10px" }}
            defaultValue={task.title}
            onChange={(e) => {
              setSubmitBtn(false); //To Enable Sumbit btn after editing
              setUpdatedTask({
                ...updatedTask,
                title: e.target.value,
              });
            }}
            fullWidth
            id="outlined-error"
            label="Task Name"
          />
          <TextField
            sx={{ margin: "30px 0 10px" }}
            defaultValue={task.details}
            onChange={(e) => {
              setSubmitBtn(false); //To Enable Sumbit btn after editing
              setUpdatedTask({
                ...updatedTask,
                details: e.target.value,
              });
            }}
            fullWidth
            id="outlined-multiline-flexible"
            label="Task Details"
            multiline
            maxRows={6}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button
            disabled={submitBtn}
            onClick={() => {
              handleEdit(task.id);
            }}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Modal || Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Delete The Task?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you selected <span className="del-word">DELETE</span> you can not
            prevent changed and the task will be deleted forever, Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Close</Button>
          <Button
            sx={{ color: "#ff0e0e" }}
            onClick={() => {
              handleDelete(task.id);
            }}
            autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Task Card */}
      <Card
        className="todo-card"
        sx={{
          minWidth: "200px",
          marginTop: "20px",
          backgroundColor: "main",
          color: "white",
        }}>
        <CardContent sx={{ padding: ".75em !important" }}>
          <Grid container spacing={2}>
            <Grid xs={8} sm={8}>
              <Typography
                sx={{
                  textAlign: "left",
                  fontSize: "1.5rem",
                  color: "#fff",
                  textDecoration: task.isCompleted ? "line-through" : "none",
                }}>
                {task.title}
              </Typography>
              <Typography
                sx={{ textAlign: "left", fontSize: "1rem", color: "#eee" }}>
                {task.details}
              </Typography>
            </Grid>
            {/* ====== Buttons Grid ====== */}
            <Grid
              xs={4}
              sm={4}
              display="flex"
              justifyContent="flex-end"
              alignItems="center">
              {/* Completed Check Button */}
              <IconButton
                onClick={() => {
                  handleIsCompleted(task.id);
                }}
                sx={{
                  padding: "5px",
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
                onClick={handleOpeEditDialog}
                sx={{
                  padding: "5px",
                  marginLeft: ".4em",
                  color: "third",
                  backgroundColor: "white",
                  border: "solid third 1px",
                }}>
                <EditOutlinedIcon />
              </IconButton>
              {/* Delete Button */}
              <IconButton
                onClick={handleOpenDeleteDialog}
                sx={{
                  padding: "5px",
                  marginLeft: ".4em",
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
