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
            return sendJsonHttpResponse(res, 500, "Database error");
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
        try {
            findedTaskAttachmentsPaths = await Promise.all(findedTaskAttachmentsPathsPromises);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Server can't get task attachments");
        }

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
        if (!findedTaskAttachment) {
            return sendJsonHttpResponse(res, 404, "Such task attachment does't exist");
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
        let attachment;
        if (attachmentType === "LINK") {
            attachment = { name: req.body.name, type: attachmentType, taskId: taskId };
        } else if (attachmentType === "FILE") {
            if (!req.files) {
                return sendJsonHttpResponse(res, 400, "No files were uploaded");
            }
            const picture = req.files.file;
            attachment = { name: picture.name, type: attachmentType, taskId: taskId };
            const taskFolder = this.taskRepository.getTaskFolder(taskId);
            const isCreated = await createFile(taskFolder, picture, false);
            if (!isCreated) {
                return sendJsonHttpResponse(res, 500, "Can't upload file");
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
        if (!taskAttachmentId) {
            return sendJsonHttpResponse(res, 400, "id didn't send");
        }
        let findedTaskAttachment;
        try {
            findedTaskAttachment = await this.taskAttachmentRepository.getById(taskAttachmentId);
            if (!findedTaskAttachment) {
                return sendJsonHttpResponse(res, 404, "such task attachment doesn't exist");
            }
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (findedTaskAttachment.type === "FILE") {
            const taskFolder = this.taskRepository.getTaskFolder(findedTaskAttachment.taskId);
            const isFileDeleted = await deleteFile(taskFolder, findedTaskAttachment.name);
            if (!isFileDeleted) {
                return sendJsonHttpResponse(res, 404, "Can't access file");
            }
        }
        let isTaskAttachmentDeleted;
        try {
            isTaskAttachmentDeleted = await this.taskAttachmentRepository.deleteAttachment(taskAttachmentId);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!isTaskAttachmentDeleted) {
            return sendJsonHttpResponse(res, 404, "such task attachment doesn't exist");
        }
        return sendJsonHttpResponse(res, 204, "Task attachment deleted");
    }
}
