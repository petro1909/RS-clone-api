import express from "express";
import BoardStatusController from "../controller/boardStatusController.js";

export const boardStatusRouter = express.Router();
const parser = express.json();
const boardStatusController = new BoardStatusController();

boardStatusRouter.get("/", async (req, res) => {
    // get statuses of one user board
    await boardStatusController.getBoardStatuses(req, res);
});

boardStatusRouter.get("/:id", async (req, res) => {
    // get status by id
    await boardStatusController.getBoardStatusById(req, res);
});

boardStatusRouter.post("/", parser, async (req, res) => {
    // create board status
    await boardStatusController.createBoardStatus(req, res);
});

boardStatusRouter.put("/", parser, async (req, res) => {
    // edit board status
    await boardStatusController.updateBoardStatus(req, res);
});

boardStatusRouter.delete("/:id", async (req, res) => {
    // delete board status
    await boardStatusController.deleteBoardStatus(req, res);
});
