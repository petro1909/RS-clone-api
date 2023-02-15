import DbBaseRepository from "./baseRepository.js";

export default class TaskUserRepository extends DbBaseRepository {
    constructor() {
        super();
        this.type = "taskUser";
    }
    async getTaskUsers(filterOptions = {}, sortParamsArray = [], pageParams = {}) {
        return await super.getAll(filterOptions, sortParamsArray, pageParams);
    }

    async getTaskUserById(taskUserId) {
        return await super.getById(taskUserId);
    }

    async createTaskUser(taskUser) {
        return await super.create(taskUser);
    }

    async updateTaskUser(taskUser) {
        return await super.update(taskUser);
    }

    async deleteTaskUser(taskUserId) {
        return await super.delete(taskUserId);
    }
}
