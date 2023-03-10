import express from "express";
import BoardUserController from "../controller/boardUserController.js";
import { verifyUser } from "../middleware/authService.js";

export const boardUserRouter = express.Router();
export default { route: "boardUsers", router: boardUserRouter };

const parser = express.json();
const boardUserController = new BoardUserController();

boardUserRouter.get("/", verifyUser, async (req, res) => {
    // get users of one user board
    await boardUserController.getBoardUsers(req, res);
});

boardUserRouter.get("/:id", verifyUser, async (req, res) => {
    // get one board user by id
    await boardUserController.getBoardUserById(req, res);
});

boardUserRouter.post("/", verifyUser, parser, async (req, res) => {
    // add user to one user board
    await boardUserController.createBoardUser(req, res);
});

boardUserRouter.put("/", verifyUser, parser, async (req, res) => {
    // edit user in one user board (meybe change role)
    await boardUserController.updateBoardUser(req, res);
});

boardUserRouter.delete("/:id", verifyUser, async (req, res) => {
    // delete user from one user board
    await boardUserController.deleteBoardUser(req, res);
});
