import { Router, Request, Response, NextFunction } from "express";
import { Todo } from "../models/todo";

let todos: Todo[] = [];

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction): void => {
  res.status(200).json({ todos: todos });
});

router.post("/todo", (req: Request, res: Response, next: NextFunction): void => {
  const newTodo: Todo = { id: new Date().toISOString(), text: req.body.text };
  todos.push(newTodo);
  res.status(201).json({ message: "Added todo", todo: newTodo, todos: todos });
});

router.put("/todo/:todoId", (req: Request, res: Response, next: NextFunction): void => {
  const todoId = req.params.todoId;
  const todoIndex = todos.findIndex((todoItem) => todoItem.id === todoId);
  if (todoIndex >= 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
    res.status(200).json({ message: "Updated todo.", todos: todos });
  }
  res.status(404).json({ message: "Could not find todo for this id." });
});

router.delete("/todo/:todoId", (req: Request, res: Response, next: NextFunction): void => {
  const todoId = req.params.todoId;
  todos = todos.filter((todoItem) => todoItem.id !== todoId);
  res.status(200).json({ message: "Deleted todo.", todos: todos });
});
export default router;
