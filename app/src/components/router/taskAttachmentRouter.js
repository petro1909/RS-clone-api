import express from "express";
import TaskAttachmentController from "../controller/taskAttachmentController.js";
import { verifyUser } from "../middleware/authService.js";

export const taskAttachmentRouter = express.Router();
export default { route: "taskAttachments", router: taskAttachmentRouter };

const parser = express.json();
const taskAttachmentController = new TaskAttachmentController();

taskAttachmentRouter.get("/", verifyUser, async (req, res) => {
    // get taskAttachments of one board status
    await taskAttachmentController.getTaskAttachmentsPaths(req, res);
});

taskAttachmentRouter.get("/:id", verifyUser, async (req, res) => {
    // get one taskAttachment by id
    await taskAttachmentController.getTaskAttachmentsPathById(req, res);
});

taskAttachmentRouter.post("/", verifyUser, parser, async (req, res) => {
    // create new taskAttachment
    await taskAttachmentController.uploadTaskAttachment(req, res);
});

taskAttachmentRouter.delete("/:id", verifyUser, async (req, res) => {
    // delete one taskAttachment
    await taskAttachmentController.deleteTaskAttachment(req, res);
});
