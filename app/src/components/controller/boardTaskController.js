import TaskRepository from "../repository/taskRepository.js";
import { getSortParamsArray } from "../service/queryParamsParser.js";

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
            res.status(500).send("Database error");
            return;
        }
        if (!userBoards) {
            res.status(500).send("Server can't get user boards");
            return;
        }
        res.status(200).json(userBoards);
    }

    async getTaskById(req, res) {
        const id = req.params.id;
        if (!id) {
            res.status(400).send("id didn't send");
            return;
        }
        let findedTask;
        try {
            findedTask = await this.taskRepository.getTaskById(id);
        } catch (err) {
            res.status(500).send("Database error");
            return;
        }
        if (!findedTask) {
            res.status(404).send(`task with id ${id} doesn't exist`);
            return;
        }
        res.status(200).json(findedTask);
    }

    async createTask(req, res) {
        const task = req.body;
        let createdTask;
        try {
            createdTask = await this.taskRepository.createTask(task);
        } catch (err) {
            res.status(500).send("Database error");
            return;
        }
        if (!createdTask) {
            res.status(400).send(`can't create task`);
            return;
        }
        res.status(201).json(createdTask);
    }

    async updateTask(req, res) {
        const taskId = req.body.id;
        if (!taskId) {
            res.status(404).send("task id does't sent");
            return;
        }
        const task = req.body;
        let updatedTask;
        try {
            updatedTask = await this.taskRepository.updateTask(task);
        } catch (err) {
            res.status(500).send("Database error");
            return;
        }
        if (!updatedTask) {
            res.status(404).send(`task with id ${taskId} does't exist`);
            return;
        }
        res.status(200).json(updatedTask);
    }

    async deleteTask(req, res) {
        const id = req.params.id;
        if (!id) {
            res.status(404).send("id does't sent");
            return;
        }
        let isDeleted;
        try {
            isDeleted = await this.taskRepository.deleteTask(id);
        } catch (err) {
            res.status(500).send("Database error");
            return;
        }
        if (!isDeleted) {
            res.status(404).send(`task with id ${id} doesn't exist`);
            return;
        }
        res.status(204).send("task deleted");
    }
}
