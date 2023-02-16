import DbBaseRepository from "./baseRepository.js";

export default class TaskMarkRepository extends DbBaseRepository {
    constructor() {
        super();
        this.type = "taskMark";
    }
    async getTaskMarks(filterOptions = {}, sortParamsArray = [], pageParams = {}) {
        return await super.getAll(filterOptions, sortParamsArray, pageParams);
    }

    async getTaskMarkById(taskMarkId) {
        return await super.getById(taskMarkId);
    }

    async createTaskMark(taskMark) {
        return await super.create(taskMark);
    }

    async updateTaskMark(taskMark) {
        return await super.update(taskMark);
    }

    async deleteTaskMark(taskMarkId) {
        return await super.delete(taskMarkId);
    }
}
