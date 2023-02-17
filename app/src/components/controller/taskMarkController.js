import TaskMarkRepository from "../repository/taskMarkRepository.js";
import { getSortParamsArray } from "../service/queryParamsParser.js";
import sendJsonHttpResponse from "../service/httpMessageService.js";

export default class TaskMarkController {
    taskMarkRepository;
    constructor() {
        this.taskMarkRepository = new TaskMarkRepository();
    }

    async getTaskMarks(req, res) {
        const queryParams = req.query;
        const filterParams = { taskId: queryParams.taskId };
        const sortParamsArray = getSortParamsArray(queryParams);
        let taskMarks;
        try {
            taskMarks = await this.taskMarkRepository.getTaskMarks(filterParams, sortParamsArray);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!taskMarks) {
            return sendJsonHttpResponse(res, 500, "Server can't get task marks");
        }
        return res.status(200).json(taskMarks);
    }

    async getTaskMarkById(req, res) {
        const id = req.params.id;
        if (!id) {
            return sendJsonHttpResponse(res, 400, "id didn't send");
        }
        let findedTaskMark;
        try {
            findedTaskMark = await this.taskMarkRepository.getTaskMarkById(id);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!findedTaskMark) {
            return sendJsonHttpResponse(res, 404, "such task mark doesn't exist");
        }
        return res.status(200).json(findedTaskMark);
    }

    async createTaskMark(req, res) {
        const taskMark = req.body;
        let createdTaskMark;
        try {
            createdTaskMark = await this.taskMarkRepository.createTaskMark(taskMark);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!createdTaskMark) {
            return sendJsonHttpResponse(res, 400, "can't create task mark");
        }
        return res.status(201).json(createdTaskMark);
    }

    async updateTaskMark(req, res) {
        const taskMarkId = req.body.id;
        if (!taskMarkId) {
            return sendJsonHttpResponse(res, 400, "id didn't send");
        }
        const taskMark = req.body;
        let updatedTaskMark;
        try {
            updatedTaskMark = await this.taskMarkRepository.updateTaskMark(taskMark);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!updatedTaskMark) {
            return sendJsonHttpResponse(res, 404, "such task mark doesn't exist");
        }
        return res.status(200).json(updatedTaskMark);
    }

    async deleteTaskMark(req, res) {
        const id = req.params.id;
        if (!id) {
            return sendJsonHttpResponse(res, 400, "id didn't send");
        }
        let isDeleted;
        try {
            isDeleted = await this.taskMarkRepository.deleteTaskMark(id);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!isDeleted) {
            return sendJsonHttpResponse(res, 404, "such task mark doesn't exist");
        }
        return sendJsonHttpResponse(res, 204, "task mark deleted");
    }
}
