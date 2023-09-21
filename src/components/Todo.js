import React, { useState } from "react";
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

  //Toggle Checked Completed
  function handleIsCompleted(taskId) {
    const updatedTaskMapForCheck = todos.map((task) => {
      if (task.id === taskId) {
        task.isCompleted = !task.isCompleted;
      }
      return task;
    });
    setTodos(updatedTaskMapForCheck);
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
    const updatedTaskMapForEdit = todos.map((task) => {
      if (task.id === taskId) {
        task.title = updatedTask.title;
        task.details = updatedTask.details;
      }
      return task;
    });
    setTodos(updatedTaskMapForEdit);
    handleCloseEditDialog();
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
    setOpenDeleteDialog(false);
    const updatedTasks = todos.filter((task) => {
      if (task.id === taskId) {
        return false;
      } else {
        return true;
      }
    });
    setTodos(updatedTasks);
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
              console.log("gg");
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
              {/* Completed Check Button */}
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
                onClick={handleOpeEditDialog}
                sx={{
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
