import TaskUserRepository from "../repository/taskUserRepository.js";
import { getSortParamsArray } from "../service/queryParamsParser.js";
import sendJsonHttpResponse from "../service/httpMessageService.js";

export default class TaskUserController {
    taskUserRepository;
    constructor() {
        this.taskUserRepository = new TaskUserRepository();
    }

    async getTaskUsers(req, res) {
        const queryParams = req.query;
        const filterParams = { taskId: queryParams.taskId };
        const sortParamsArray = getSortParamsArray(queryParams);
        let taskUsers;
        try {
            taskUsers = await this.taskUserRepository.getTaskUsers(filterParams, sortParamsArray);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!taskUsers) {
            return sendJsonHttpResponse(res, 500, "Server can't get task users");
        }
        return res.status(200).json(taskUsers);
    }

    async getTaskUserById(req, res) {
        const id = req.params.id;
        if (!id) {
            return sendJsonHttpResponse(res, 400, "id didn't send");
        }
        let findedTaskUser;
        try {
            findedTaskUser = await this.taskUserRepository.getTaskUserById(id);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!findedTaskUser) {
            return sendJsonHttpResponse(res, 404, "such task user doesn't exist");
        }
        return res.status(200).json(findedTaskUser);
    }

    async createTaskUser(req, res) {
        const taskUser = req.body;
        let createdTaskUser;
        try {
            createdTaskUser = await this.taskUserRepository.createTaskUser(taskUser);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!createdTaskUser) {
            return sendJsonHttpResponse(res, 400, "can't create task user");
        }
        return res.status(201).json(createdTaskUser);
    }

    async updateTaskUser(req, res) {
        const taskUserId = req.body.id;
        if (!taskUserId) {
            return sendJsonHttpResponse(res, 400, "id didn't send");
        }
        const taskUser = req.body;
        let updatedTaskUser;
        try {
            updatedTaskUser = await this.taskUserRepository.updateTaskUser(taskUser);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!updatedTaskUser) {
            return sendJsonHttpResponse(res, 404, "such task user doesn't exist");
        }
        return res.status(200).json(updatedTaskUser);
    }

    async deleteTaskUser(req, res) {
        const id = req.params.id;
        if (!id) {
            return sendJsonHttpResponse(res, 400, "id didn't send");
        }
        let isDeleted;
        try {
            isDeleted = await this.taskUserRepository.deleteTaskUser(id);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!isDeleted) {
            return sendJsonHttpResponse(res, 404, "such task user doesn't exist");
        }
        return sendJsonHttpResponse(res, 204, "task user deleted");
    }
}
