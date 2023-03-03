import DbBaseRepository from "./baseRepository.js";
import { staticFilesFolder } from "../../app.js";

export default class TaskRepository extends DbBaseRepository {
    constructor() {
        super();
        this.type = "task";
    }
    async getTasks(filterOptions = {}, sortParamsArray = [], pageParams = {}) {
        return await super.getAll(filterOptions, sortParamsArray, pageParams);
    }

    async getTaskById(taskId) {
        return await super.getById(taskId);
    }

    async createTask(task) {
        return await super.create(task);
    }

    async updateTask(task) {
        return await super.update(task);
    }

    async deleteTask(taskId) {
        return await super.delete(taskId);
    }

    getTaskFolder(taskId) {
        return `${staticFilesFolder}/taskFolder/${taskId}`;
    }
    getTaskFileRelativePath(taskId, fileName) {
        return `/taskFolder/${taskId}/${fileName}`;
    }
}
