import express from "express";
import TaskController from "../controller/boardTaskController.js";
import { verifyUser } from "../middleware/authService.js";

export const boardTaskRouter = express.Router();
export default { route: "tasks", router: boardTaskRouter };

const parser = express.json();
const taksController = new TaskController();

boardTaskRouter.get("/", verifyUser, async (req, res) => {
    // get tasks of one board status
    await taksController.getTasks(req, res);
});

boardTaskRouter.get("/:id", verifyUser, async (req, res) => {
    // get one task by id
    await taksController.getTaskById(req, res);
});

boardTaskRouter.post("/", verifyUser, parser, async (req, res) => {
    // create new task
    await taksController.createTask(req, res);
});

boardTaskRouter.put("/", verifyUser, parser, async (req, res) => {
    // edit one task
    await taksController.updateTask(req, res);
});

boardTaskRouter.delete("/:id", verifyUser, async (req, res) => {
    // delete one task
    await taksController.deleteTask(req, res);
});
