import express from "express";
import TaskController from "../controller/boardTaskController.js";

export const boardTaskRouter = express.Router();
const parser = express.json();
const taksController = new TaskController();

boardTaskRouter.get("/", async (req, res) => {
    // get tasks of one board status
    await taksController.getTasks(req, res);
});

boardTaskRouter.get("/:id", async (req, res) => {
    // get one task by id
    await taksController.getTaskById(req, res);
});

boardTaskRouter.post("/", parser, async (req, res) => {
    // create new task
    await taksController.createTask(req, res);
});

boardTaskRouter.put("/", parser, async (req, res) => {
    // edit one task
    await taksController.updateTask(req, res);
});

boardTaskRouter.delete("/", async (req, res) => {
    // delete one task
    await taksController.deleteTask(req, res);
});
