import TaskMarkRepository from "../repository/taskMarkRepository.js";
import { getSortParamsArray } from "../service/queryParamsParser.js";

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
            res.status(500).send("Database error");
            return;
        }
        if (!taskMarks) {
            res.status(500).send("Server can't get user boards");
            return;
        }
        res.status(200).json(taskMarks);
    }

    async getTaskMarkById(req, res) {
        const id = req.params.id;
        if (!id) {
            res.status(400).send("id didn't send");
            return;
        }
        let findedTaskMark;
        try {
            findedTaskMark = await this.taskMarkRepository.getTaskMarkById(id);
        } catch (err) {
            res.status(500).send("Database error");
            return;
        }
        if (!findedTaskMark) {
            res.status(404).send(`taskMark with id ${id} doesn't exist`);
            return;
        }
        res.status(200).json(findedTaskMark);
    }

    async createTaskMark(req, res) {
        const taskMark = req.body;
        let createdTaskMark;
        try {
            createdTaskMark = await this.taskMarkRepository.createTaskMark(taskMark);
        } catch (err) {
            res.status(500).send("Database error");
            return;
        }
        if (!createdTaskMark) {
            res.status(400).send(`can't create taskMark`);
            return;
        }
        res.status(201).json(createdTaskMark);
    }

    async updateTaskMark(req, res) {
        const taskMarkId = req.body.id;
        if (!taskMarkId) {
            res.status(404).send("taskMark id does't sent");
            return;
        }
        const taskMark = req.body;
        let updatedTaskMark;
        try {
            updatedTaskMark = await this.taskMarkRepository.updateTaskMark(taskMark);
        } catch (err) {
            res.status(500).send("Database error");
            return;
        }
        if (!updatedTaskMark) {
            res.status(404).send(`taskMark with id ${taskMarkId} does't exist`);
            return;
        }
        res.status(200).json(updatedTaskMark);
    }

    async deleteTaskMark(req, res) {
        const id = req.params.id;
        if (!id) {
            res.status(404).send("id does't sent");
            return;
        }
        let isDeleted;
        try {
            isDeleted = await this.taskMarkRepository.deleteTaskMark(id);
        } catch (err) {
            res.status(500).send("Database error");
            return;
        }
        if (!isDeleted) {
            res.status(404).send(`taskMark with id ${id} doesn't exist`);
            return;
        }
        res.status(204).send("taskMark deleted");
    }
}
