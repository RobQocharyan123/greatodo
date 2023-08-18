import {
  ChangeEvent,
  ChangeEventHandler,
  KeyboardEvent,
  useState,
} from "react";
import { FilterValuesType } from "./App";
import "./TodoList.css";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Checkbox, IconButton } from "@mui/material";

export type TasksType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TasksType>;
  removeStack: (id: string, todoListId: string) => void;
  addTask: (val: string, todoListId: string) => void;
  changeFilter: (val: FilterValuesType, todoListId: string) => void;
  changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void;
  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    todoListId: string
  ) => void;
  filter: FilterValuesType;
  removeTodoList: (id: string) => void;
  changeToDoListTitle: (id: string, newTitle: string) => void;
};

function TodoList(props: PropsType) {
  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };
  const onClickFilterAll = () => props.changeFilter("all", props.id);
  const onClickFilterActive = () => props.changeFilter("active", props.id);
  const onClickFilterCompleted = () =>
    props.changeFilter("completed", props.id);

  const removeTodoList = () => {
    props.removeTodoList(props.id);
  };
  const changeToDoListTitle = (newTitle: string) => {
    props.changeToDoListTitle(props.id, newTitle);
  };

  return (
    <div>
      <h3>
        <EditableSpan onChange={changeToDoListTitle} title={props.title} />{" "}
        <IconButton onClick={removeTodoList}>
          <DeleteIcon />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />

      <div>
        {props.tasks.map(({ id, title, isDone }) => {
          const onClickRemoveTask = () => props.removeStack(id, props.id);

          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(id, e.currentTarget.checked, props.id);
          };

          const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(id, newValue, props.id);
          };

          return (
            <div key={id} className={isDone ? "is-done" : ""}>
              <Checkbox 
                onChange={onChangeStatusHandler}
                checked={isDone}
              />{" "}
              <EditableSpan title={title} onChange={onChangeTitleHandler} />
              <IconButton onClick={onClickRemoveTask}>
                <DeleteIcon />
              </IconButton>
            </div>
          );
        })}
      </div>

      <Box sx={{ m: 2 }}>

        <Button
          color="success"
          variant={props.filter === "all" ? "contained" : "text"}
          onClick={onClickFilterAll}
        >
          All
        </Button>
        <Button
          color="primary"
          variant={props.filter === "active" ? "contained" : "text"}

          onClick={onClickFilterActive}
        >
          Active
        </Button>
        <Button
          color="secondary"
          variant={props.filter === "completed" ? "contained" : "text"}

          onClick={onClickFilterCompleted}
        >
          Completed
        </Button>

      </Box>

  </div>
  );
}

export default TodoList;
