import TaskService from "../service/taskService.js";
import { getSortParamsArray } from "../util/queryParamsParser.js";

export default class TaskController {
    taskService;
    constructor() {
        this.taskService = new TaskService();
    }

    async getTasks(req, res) {
        const queryParams = req.query;
        const filterParams = { statusId: queryParams.statusId };
        const sortParamsArray = getSortParamsArray(queryParams);
        let userBoards;
        try {
            userBoards = await this.userBoardService.getBoards(filterParams, sortParamsArray);
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
            findedTask = await this.taskService.getTaskById(id);
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
        const task = { text: req.body.text, statusId: req.body.statusId };
        let createdTask;
        try {
            createdTask = await this.taskService.createTask(task);
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
        const task = { text: req.body.text, statusId: req.body.statusId };
        let updatedTask;
        try {
            updatedTask = await this.taskService.updateTask(taskId, task);
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
        const id = req.params.taskdId;
        if (!id) {
            res.status(404).send("id does't sent");
            return;
        }
        let isDeleted;
        try {
            isDeleted = await this.taskService.deleteTask(id);
        } catch (err) {
            res.status(500).send("Database error");
            return;
        }
        if (!isDeleted) {
            res.status(404).send(`task with id ${id} doesn't exist`);
            return;
        }
        res.status(200).send("task deleted");
    }
}
