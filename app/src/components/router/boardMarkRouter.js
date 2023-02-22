import express from "express";
import BoardMarkController from "../controller/boardMarkController.js";

export const boardMarkRouter = express.Router();
export default { route: "boardMarks", router: boardMarkRouter };

const parser = express.json();
const boardMarkController = new BoardMarkController();
import { verifyUser } from "../middleware/authService.js";

boardMarkRouter.get("/", verifyUser, async (req, res) => {
    // get Markes of one user board
    await boardMarkController.getBoardMarkes(req, res);
});

boardMarkRouter.get("/:id", verifyUser, async (req, res) => {
    // get Mark by id
    await boardMarkController.getBoardMarkById(req, res);
});

boardMarkRouter.post("/", verifyUser, parser, async (req, res) => {
    // create board Mark
    await boardMarkController.createBoardMark(req, res);
});

boardMarkRouter.put("/", verifyUser, parser, async (req, res) => {
    // edit board Mark
    await boardMarkController.updateBoardMark(req, res);
});

boardMarkRouter.delete("/:id", verifyUser, async (req, res) => {
    // delete board Mark
    await boardMarkController.deleteBoardMark(req, res);
});
