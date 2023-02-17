import TaskRepository from "../repository/taskRepository.js";
import { getSortParamsArray } from "../service/queryParamsParser.js";
import sendJsonHttpResponse from "../service/httpMessageService.js";

export default class TaskController {
    taskRepository;
    constructor() {
        this.taskRepository = new TaskRepository();
    }

    async getTasks(req, res) {
        const queryParams = req.query;
        const filterParams = { statusId: queryParams.statusId };
        const sortParamsArray = getSortParamsArray(queryParams);
        let userBoards;
        try {
            userBoards = await this.taskRepository.getTasks(filterParams, sortParamsArray);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!userBoards) {
            return sendJsonHttpResponse(res, 500, "Server can't get user boards");
        }
        return res.status(200).json(userBoards);
    }

    async getTaskById(req, res) {
        const id = req.params.id;
        if (!id) {
            return sendJsonHttpResponse(res, 400, "id didn't sent");
        }
        let findedTask;
        try {
            findedTask = await this.taskRepository.getTaskById(id);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!findedTask) {
            return sendJsonHttpResponse(res, 404, "such task doesn't exist");
        }
        return res.status(200).json(findedTask);
    }

    async createTask(req, res) {
        const task = req.body;
        let createdTask;
        try {
            createdTask = await this.taskRepository.createTask(task);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!createdTask) {
            return sendJsonHttpResponse(res, 400, "can't create task");
        }
        return res.status(201).json(createdTask);
    }

    async updateTask(req, res) {
        const taskId = req.body.id;
        if (!taskId) {
            return sendJsonHttpResponse(res, 400, "id didn't sent");
        }
        const task = req.body;
        let updatedTask;
        try {
            updatedTask = await this.taskRepository.updateTask(task);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!updatedTask) {
            return sendJsonHttpResponse(res, 404, "such task doesn't exist");
        }
        return res.status(200).json(updatedTask);
    }

    async deleteTask(req, res) {
        const id = req.params.id;
        if (!id) {
            return sendJsonHttpResponse(res, 400, "id didn't sent");
        }
        let isDeleted;
        try {
            isDeleted = await this.taskRepository.deleteTask(id);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!isDeleted) {
            return sendJsonHttpResponse(res, 404, "such task doesn't exist");
        }
        return sendJsonHttpResponse(res, 204, "task deleted");
    }
}
