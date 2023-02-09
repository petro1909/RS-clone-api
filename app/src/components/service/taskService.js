import { db } from "../model/db.js";

export default class TaskService {
    async getTasks(filterOptions = {}, sortParamsArray = [], pageParams = {}) {
        let tasks;
        try {
            tasks = await db.task.findAll({
                where: filterOptions,
                order: sortParamsArray,
                offset: pageParams.offset,
                limit: pageParams.limit,
            });
        } catch (err) {
            throw new Error(err);
        }
        return tasks;
    }

    async getTaskById(taskId) {
        let task;
        try {
            task = await db.task.findByPk(taskId);
        } catch (err) {
            throw new Error(err);
        }
        return task;
    }

    async createTask(task) {
        let createdTask;
        try {
            createdTask = await db.task.create(task);
        } catch (err) {
            throw new Error(err);
        }
        return createdTask;
    }

    async updateTask(taskId, task) {
        let updatedTaskResult;
        try {
            updatedTaskResult = await db.task.update(task, { where: { id: taskId }, returning: true, plain: true });
        } catch (err) {
            throw new Error(err);
        }
        const updatedTask = updatedTaskResult[1].dataValues;
        return updatedTask;
    }

    async deleteTask(taskId) {
        let result;
        try {
            result = await db.task.destroy({ where: { id: taskId } });
        } catch (err) {
            throw new Error();
        }
        return result;
    }
}
