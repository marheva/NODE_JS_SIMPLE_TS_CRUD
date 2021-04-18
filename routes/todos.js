"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var todos = [];
var router = express_1.Router();
router.get("/", function (req, res, next) {
    res.status(200).json({ todos: todos });
});
router.post("/todo", function (req, res, next) {
    var newTodo = { id: new Date().toISOString(), text: req.body.text };
    todos.push(newTodo);
    res.status(201).json({ message: "Added todo", todo: newTodo, todos: todos });
});
router.put("/todo/:todoId", function (req, res, next) {
    var todoId = req.params.todoId;
    var todoIndex = todos.findIndex(function (todoItem) { return todoItem.id === todoId; });
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
        res.status(200).json({ message: "Updated todo.", todos: todos });
    }
    res.status(404).json({ message: "Could not find todo for this id." });
});
router.delete("/todo/:todoId", function (req, res, next) {
    var todoId = req.params.todoId;
    todos = todos.filter(function (todoItem) { return todoItem.id !== todoId; });
    res.status(200).json({ message: "Deleted todo.", todos: todos });
});
exports.default = router;
