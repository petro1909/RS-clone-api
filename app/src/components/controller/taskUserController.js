import TaskUserRepository from "../repository/taskUserRepository.js";
import { getSortParamsArray } from "../service/queryParamsParser.js";

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
            res.status(500).send("Database error");
            return;
        }
        if (!taskUsers) {
            res.status(500).send("Server can't get user boards");
            return;
        }
        res.status(200).json(taskUsers);
    }

    async getTaskUserById(req, res) {
        const id = req.params.id;
        if (!id) {
            res.status(400).send("id didn't send");
            return;
        }
        let findedTaskUser;
        try {
            findedTaskUser = await this.taskUserRepository.getTaskUserById(id);
        } catch (err) {
            res.status(500).send("Database error");
            return;
        }
        if (!findedTaskUser) {
            res.status(404).send(`taskUser with id ${id} doesn't exist`);
            return;
        }
        res.status(200).json(findedTaskUser);
    }

    async createTaskUser(req, res) {
        const taskUser = req.body;
        let createdTaskUser;
        try {
            createdTaskUser = await this.taskUserRepository.createTaskUser(taskUser);
        } catch (err) {
            res.status(500).send("Database error");
            return;
        }
        if (!createdTaskUser) {
            res.status(400).send(`can't create taskUser`);
            return;
        }
        res.status(201).json(createdTaskUser);
    }

    async updateTaskUser(req, res) {
        const taskUserId = req.body.id;
        if (!taskUserId) {
            res.status(404).send("taskUser id does't sent");
            return;
        }
        const taskUser = req.body;
        let updatedTaskUser;
        try {
            updatedTaskUser = await this.taskUserRepository.updateTaskUser(taskUser);
        } catch (err) {
            res.status(500).send("Database error");
            return;
        }
        if (!updatedTaskUser) {
            res.status(404).send(`taskUser with id ${taskUserId} does't exist`);
            return;
        }
        res.status(200).json(updatedTaskUser);
    }

    async deleteTaskUser(req, res) {
        const id = req.params.id;
        if (!id) {
            res.status(404).send("id does't sent");
            return;
        }
        let isDeleted;
        try {
            isDeleted = await this.taskUserRepository.deleteTaskUser(id);
        } catch (err) {
            res.status(500).send("Database error");
            return;
        }
        if (!isDeleted) {
            res.status(404).send(`taskUser with id ${id} doesn't exist`);
            return;
        }
        res.status(204).send("taskUser deleted");
    }
}
