import express from "express";
import TaskUserController from "../controller/taskUserController.js";
import { verifyUser } from "../middleware/authService.js";

export const taskUserRouter = express.Router();
export default { route: "taskUsers", router: taskUserRouter };

const parser = express.json();
const taskUserController = new TaskUserController();

taskUserRouter.get("/", verifyUser, async (req, res) => {
    // get taskUsers of one board status
    await taskUserController.getTaskUsers(req, res);
});

taskUserRouter.get("/:id", verifyUser, async (req, res) => {
    // get one taskUser by id
    await taskUserController.getTaskUserById(req, res);
});

taskUserRouter.post("/", verifyUser, parser, async (req, res) => {
    // create new taskUser
    await taskUserController.createTaskUser(req, res);
});

taskUserRouter.put("/", verifyUser, parser, async (req, res) => {
    // edit one taskUser
    await taskUserController.updateTaskUser(req, res);
});

taskUserRouter.delete("/:id", verifyUser, async (req, res) => {
    // delete one taskUser
    await taskUserController.deleteTaskUser(req, res);
});
