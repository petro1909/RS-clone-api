import TaskAttachmentRepository from "../repository/taskAttachmentRepository.js";
import TaskRepository from "../repository/taskRepository.js";
import sendJsonHttpResponse from "../service/httpMessageService.js";
import { createFile, deleteFile, getStaticFile } from "../service/fileService.js";
import { getFilterParams, getPageParams, getSortParamsArray } from "../service/queryParamsParser.js";

export default class TaskAttachmentController {
    taskAttachmentRepository;
    constructor() {
        this.taskRepository = new TaskRepository();
        this.taskAttachmentRepository = new TaskAttachmentRepository();
    }

    async getTaskAttachmentsPaths(req, res) {
        const queryParams = req.query;
        const taskId = queryParams.taskId;
        const filterParams = getFilterParams(queryParams);
        const pageParams = getPageParams(queryParams);
        const sortParamsArray = getSortParamsArray(queryParams);
        let findedTaskAttachments;
        try {
            findedTaskAttachments = await this.taskAttachmentRepository.getAll(filterParams, sortParamsArray, pageParams);
        } catch (err) {
            return res.status(500).send("Database error");
        }
        let findedTaskAttachmentsPathsPromises = [];
        let findedTaskAttachmentsPaths = [];
        const taskFolder = this.taskRepository.getTaskFolder(taskId);
        findedTaskAttachmentsPathsPromises = findedTaskAttachments
            .map((attachment) => {
                if (attachment.type === "LINK") {
                    return attachment;
                }
                const attachmentName = attachment.name;
                const attachmentPath = getStaticFile(taskFolder, attachmentName);
                if (!attachmentPath) return null;
                attachment.path = attachmentPath;
                return attachment;
            })
            .filter((attachment) => attachment !== null);
        findedTaskAttachmentsPaths = Promise.allSettled(findedTaskAttachmentsPathsPromises);
        return res.status(200).json(findedTaskAttachmentsPaths);
    }

    async getTaskAttachmentsPathById(req, res) {
        const taskAttachmentId = req.params.id;
        let findedTaskAttachment;
        try {
            findedTaskAttachment = await this.taskAttachmentRepository.getById(taskAttachmentId);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (findedTaskAttachment.type === "LINK") {
            return res.status(200).json(findedTaskAttachment);
        }
        const taskFolder = this.taskRepository.getTaskFolder(findedTaskAttachment.taskId);
        const attachmentPath = await getStaticFile(taskFolder, findedTaskAttachment.name);
        if (attachmentPath) {
            findedTaskAttachment.path = attachmentPath;
            return res.status(200).json(findedTaskAttachment);
        } else {
            return sendJsonHttpResponse(res, 404, "Can't access file");
        }
    }

    async uploadTaskAttachment(req, res) {
        const taskId = req.body.taskId;
        const attachmentType = req.body.type;

        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }
        const picture = req.files[0];
        const attachment = { name: picture.name, attachmentType: attachmentType, taskId: taskId };
        if (!attachmentType === "LINK") {
            const taskFolder = this.taskRepository.getTaskFolder(taskId);
            const isCreated = await createFile(taskFolder, picture, false);
            if (!isCreated) {
                return res.status(500).send("Can't upload file");
            }
        }
        let createdAttachment;
        try {
            createdAttachment = await this.taskAttachmentRepository.create(attachment);
            return res.status(201).json(createdAttachment);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
    }

    async deleteTaskAttachment(req, res) {
        const taskAttachmentId = req.params.id;
        let findedTaskAttachment;
        try {
            const findedTaskAttachment = await this.taskAttachmentRepository.getById(taskAttachmentId);
            if (!findedTaskAttachment) {
                return res.status(404).send(`such task attachment doesn't exist`);
            }
        } catch (err) {
            return res.status(500).send("Database error");
        }
        const taskFolder = this.taskRepository.getTaskFolder(findedTaskAttachment.taskId);
        const isFileDeleted = await deleteFile(taskFolder, findedTaskAttachment.name);
        if (isFileDeleted) {
            let isTaskAttachmentDeleted;
            try {
                isTaskAttachmentDeleted = await this.taskAttachmentRepository.deleteAttachment(taskAttachmentId);
            } catch (err) {
                return sendJsonHttpResponse(res, 500, "Database error");
            }
            if (!isTaskAttachmentDeleted) {
                return sendJsonHttpResponse(res, 404, "such task attachment doesn't exist");
            }
            return res.status(204).send(" task attachment picture deleted");
        } else {
            return sendJsonHttpResponse(res, 404, "Can't access file");
        }
    }
}
