import express from "express";
import TaskMarkController from "../controller/taskMarkController.js";
import { verifyUser } from "../middleware/authService.js";

export const taskMarkRouter = express.Router();
const parser = express.json();
const taskMarkController = new TaskMarkController();

taskMarkRouter.get("/", verifyUser, async (req, res) => {
    // get taskMarks of one board status
    await taskMarkController.getTaskMarks(req, res);
});

taskMarkRouter.get("/:id", verifyUser, async (req, res) => {
    // get one taskMark by id
    await taskMarkController.getTaskMarkById(req, res);
});

taskMarkRouter.post("/", verifyUser, parser, async (req, res) => {
    // create new taskMark
    await taskMarkController.createTaskMark(req, res);
});

taskMarkRouter.put("/", verifyUser, parser, async (req, res) => {
    // edit one taskMark
    await taskMarkController.updateTaskMark(req, res);
});

taskMarkRouter.delete("/:id", verifyUser, async (req, res) => {
    // delete one taskMark
    await taskMarkController.deleteTaskMark(req, res);
});
