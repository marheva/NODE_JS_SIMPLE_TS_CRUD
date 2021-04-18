import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import todosRoutes from "./routes/todos";

const app: Application = express();

app.use(bodyParser.json());

app.use(todosRoutes);

app.listen(3000);
