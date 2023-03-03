import express from "express";
import BoardController from "../controller/userBoardController.js";
import { verifyUser } from "../middleware/authService.js";

export const userBoardRouter = express.Router();
export default { route: "boards", router: userBoardRouter };

const parser = express.json();
const boardController = new BoardController();

userBoardRouter.get("/", verifyUser, async (req, res) => {
    // get user boards
    await boardController.getUserBoards(req, res);
});

userBoardRouter.get("/:id", verifyUser, async (req, res) => {
    // get user board by id
    await boardController.getUserBoardById(req, res);
});

userBoardRouter.post("/", verifyUser, parser, async (req, res) => {
    // create user board
    await boardController.createUserBoard(req, res);
});

userBoardRouter.put("/", verifyUser, parser, async (req, res) => {
    // edit user board
    await boardController.updateUserBoard(req, res);
});

userBoardRouter.delete("/:id", verifyUser, async (req, res) => {
    // delete user board
    await boardController.deleteUserBoard(req, res);
});
