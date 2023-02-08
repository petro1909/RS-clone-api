import express from "express";
import BoardController from "../controller/userBoardController.js";

export const userBoardRouter = express.Router();
const parser = express.json();
const boardController = new BoardController();

userBoardRouter.get("/", async (req, res) => {
    // get user boards
    await boardController.getUserBoards(req, res);
});

userBoardRouter.get("/:id", async (req, res) => {
    // get user board by id
    await boardController.getUserBoardById(req, res);
});

userBoardRouter.post("/", parser, async (req, res) => {
    // create user board
    await boardController.createUserBoard(req, res);
});

userBoardRouter.put("/", parser, async (req, res) => {
    // edit user board
    await boardController.updateUserBoard(req, res);
});

userBoardRouter.delete("/", async (req, res) => {
    // delete user board
    await boardController.deleteUserBoard(req, res);
});
