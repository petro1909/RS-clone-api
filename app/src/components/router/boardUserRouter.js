import express from 'express';
import BoardController from '../controller/userBoardController.js';

export const boardUserRouter = express.Router();
const parser = express.json();
const boardUserController = new BoardUserController();

userBoardRouter.get("/", async (req, res) => {
  await boardUserController.getBoardUsers(req, res);
})

userBoardRouter.get("/:id", async (req, res) => {
  await boardUserController.getBoardById(req, res);
})

userBoardRouter.post("/", parser, async (req, res) => {
  await boardUserController.createBoard(req, res);
})

userBoardRouter.put("/", async (req, res) => {
  await boardUserController.updateBoard(req, res);
})

userBoardRouter.delete("/", async (req, res) => {
  await boardUserController.deleteBoard(req, res);
})