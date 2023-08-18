import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { useState } from "react";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import "./App.css";
import TodoList, { TasksType } from "./TodoList";

export type FilterValuesType = "all" | "completed" | "active";

type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

type TasksTypeToDo = {
  [key: string]: Array<TasksType>;
};

function App() {
  const removeStack = (id: string, todoListId: string) => {
    let task = tasksObj[todoListId];
    let taskFilter = task.filter((i) => {
      return i.id !== id;
    });
    tasksObj[todoListId] = taskFilter;
    setTaskObj({ ...tasksObj });
  };

  const changeFilter = (val: FilterValuesType, todoListId: string) => {
    let todolist = todo.find((tl) => tl.id === todoListId);
    if (todolist) {
      todolist.filter = val;
      setTodo([...todo]);
    }
  };

  const addItem = (value: string, todoListId: string) => {
    let newTask = { id: v1(), title: value, isDone: false };
    let task = tasksObj[todoListId];
    let newAddTask = [newTask, ...task];
    tasksObj[todoListId] = newAddTask;
    setTaskObj({ ...tasksObj });
  };

  const changeStatus = (
    taskId: string,
    isDone: boolean,
    todoListId: string
  ) => {
    let task = tasksObj[todoListId];
    let taskChecked = task.find((i) => i.id === taskId);
    if (taskChecked) {
      taskChecked.isDone = isDone;
      setTaskObj({ ...tasksObj });
    }
  };

  const changeTaskTitle = (
    taskId: string,
    newTitle: string,
    todoListId: string
  ) => {
    let task = tasksObj[todoListId];
    let taskChecked = task.find((i) => i.id === taskId);
    if (taskChecked) {
      taskChecked.title = newTitle;
      setTaskObj({ ...tasksObj });
    }
  };

  function changeToDoListTitle(id: string, newTitle: string) {
    const todolist = todo.find((tl) => tl.id === id);
    if (todolist) {
      todolist.title = newTitle;
      setTodo([...todo]);
    }
  }
  // let tasks2:Array<TasksType> = [
  //   {id:1,title:"The Princess Bride",isDone:false},
  //   {id:2,title:"Toy Story",isDone:false},
  //   {id:3,title:"Frozen",isDone:true},
  //   {id:4,title:"The Grand Budapest Hotel",isDone:true},
  //   {id:5,title:"Carnage",isDone:false}
  // ];

  // let tasks3:Array<TasksType> = [
  //   {id:1,title:"Martha Speaks",isDone:true},
  //   {id:2,title:"Word Girl",isDone:false},
  //   {id:3,title:"Doki",isDone:false},
  //   {id:4,title:"Postcards From Buster",isDone:true},
  //   {id:5,title:"Adventure Time",isDone:false}
  // ];

  let todoList1 = v1();
  let todoList2 = v1();

  let [todo, setTodo] = useState<Array<TodoListType>>([
    { id: todoList1, title: "what to learn", filter: "all" },
    { id: todoList2, title: "what to buy", filter: "all" },
  ]);

  let [tasksObj, setTaskObj] = useState<TasksTypeToDo>({
    [todoList1]: [
      { id: v1(), title: "HTML", isDone: true },
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "JavaScript", isDone: true },
      { id: v1(), title: "React", isDone: true },
      { id: v1(), title: "PHP", isDone: false },
    ],
    [todoList2]: [
      { id: v1(), title: "Book", isDone: false },
      { id: v1(), title: "Tea", isDone: true },
    ],
  });

  const removeTodoList = (todoListId: string) => {
    let tasksObjRemove = todo.filter((i) => i.id !== todoListId);

    setTodo(tasksObjRemove);
    delete tasksObj[todoListId];
    setTaskObj({ ...tasksObj });
  };

  function addToDoList(title: string) {
    let todolist: TodoListType = {
      id: v1(),
      filter: "all",
      title: title,
    };

    setTodo([todolist, ...todo]);
    setTaskObj({
      ...tasksObj,
      [todolist.id]: [],
    });
  }

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container fixed>
        <Grid container style={{padding:"20px"}}>
          <AddItemForm addItem={addToDoList} />
        </Grid>

        <Grid container spacing={5}>
          {todo.map((list) => {
            let tasksForTodoList = tasksObj[list.id];
            if (list.filter === "completed") {
              tasksForTodoList = tasksForTodoList.filter(
                (t) => t.isDone === true
              );
            }

            if (list.filter === "active") {
              tasksForTodoList = tasksForTodoList.filter(
                (t) => t.isDone === false
              );
            }

            return (
              <Grid item>
                <Paper style={{padding:"10px"}}>
                  <TodoList
                    key={list.id}
                    id={list.id}
                    title={list.title}
                    tasks={tasksForTodoList}
                    removeStack={removeStack}
                    addTask={addItem}
                    changeFilter={changeFilter}
                    changeStatus={changeStatus}
                    changeTaskTitle={changeTaskTitle}
                    filter={list.filter}
                    removeTodoList={removeTodoList}
                    changeToDoListTitle={changeToDoListTitle}
                  />
                </Paper>
              </Grid>
            );
          })}

          {/* < TodoList title="Movies" tasks={tasks2} />
      < TodoList title="Cartoons" tasks = {tasks3} /> */}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
