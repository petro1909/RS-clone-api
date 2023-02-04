import express from 'express';
import TaskController from '../controller/taskController.js';

export const taskRouter = express.Router();
const parser = express.json();
const taksController = new TaskController();

taskRouter.get("/", async (req, res) => {
  await taksController.getTasks(req, res);
})

taskRouter.get("/:id", async (req, res) => {
  await taksController.getTaskById(req, res);
})

taskRouter.post("/", parser, async (req, res) => {
  await taksController.createTask(req, res);
})

taskRouter.put("/", parser, async (req, res) => {
  await taksController.updateTask(req, res);
})

taskRouter.delete("/", async (req, res) => {
  await taksController.deleteTask(req, res);
})