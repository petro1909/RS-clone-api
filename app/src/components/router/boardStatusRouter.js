import express from "express";
import BoardStatusController from "../controller/boardStatusController.js";

const boardStatusRouter = express.Router();
export default { route: "statuses", router: boardStatusRouter };

const parser = express.json();
const boardStatusController = new BoardStatusController();
import { verifyUser } from "../middleware/authService.js";

boardStatusRouter.get("/", async (req, res) => {
    // get statuses of one user board
    await boardStatusController.getBoardStatuses(req, res);
});

boardStatusRouter.get("/:id", verifyUser, async (req, res) => {
    // get status by id
    await boardStatusController.getBoardStatusById(req, res);
});

boardStatusRouter.post("/", verifyUser, parser, async (req, res) => {
    // create board status
    await boardStatusController.createBoardStatus(req, res);
});

boardStatusRouter.put("/", verifyUser, parser, async (req, res) => {
    // edit board status
    await boardStatusController.updateBoardStatus(req, res);
});

boardStatusRouter.delete("/:id", verifyUser, async (req, res) => {
    // delete board status
    await boardStatusController.deleteBoardStatus(req, res);
});
