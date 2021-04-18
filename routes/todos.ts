import { Router, Request, Response, NextFunction } from "express";
import { Todo } from "../models/todo";

type RequestBodyType = {
  text: string;
};

type RequestParamsType = {
  todoId: string;
};

let todos: Todo[] = [];

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction): void => {
  res.status(200).json({ todos: todos });
});

router.post("/todo", (req: Request, res: Response, next: NextFunction): void => {
  const body = req.body as RequestBodyType;
  const newTodo: Todo = { id: new Date().toISOString(), text: body.text };
  todos.push(newTodo);
  res.status(201).json({ message: "Added todo", todo: newTodo, todos: todos });
});

router.put("/todo/:todoId", (req: Request, res: Response, next: NextFunction): void => {
  const body = req.body as RequestBodyType;
  const params = req.params as RequestParamsType;
  const todoId = params.todoId;
  const todoIndex = todos.findIndex((todoItem) => todoItem.id === todoId);
  if (todoIndex >= 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
    res.status(200).json({ message: "Updated todo.", todos: todos });
  }
  res.status(404).json({ message: "Could not find todo for this id." });
});

router.delete("/todo/:todoId", (req: Request, res: Response, next: NextFunction): void => {
  const params = req.params as RequestParamsType;
  const todoId = params.todoId;
  todos = todos.filter((todoItem) => todoItem.id !== todoId);
  res.status(200).json({ message: "Deleted todo.", todos: todos });
});
export default router;
