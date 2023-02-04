import express from 'express';
import BoardController from '../controller/userBoardController.js';

export const userBoardRouter = express.Router();
const parser = express.json();
const boardController = new BoardController();

userBoardRouter.get("/", async (req, res) => {
  await boardController.getUserBoards(req, res);
})

userBoardRouter.get("/:id", async (req, res) => {
  await boardController.getUserBoardById(req, res);
})

userBoardRouter.post("/", parser, async (req, res) => {
  await boardController.createUserBoard(req, res);
})

userBoardRouter.put("/", async (req, res) => {
  await boardController.updateUserBoard(req, res);
})

userBoardRouter.delete("/", async (req, res) => {
  await boardController.deleteUserBoard(req, res);
})



