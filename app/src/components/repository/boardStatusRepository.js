import DbBaseRepository from "./baseRepository.js";

export default class BoardStatusRepository extends DbBaseRepository {
    constructor() {
        super();
        this.type = "status";
    }
    async getStatuses(filterOptions = {}, sortParamsArray = [], pageParams = {}) {
        return await super.getAll(filterOptions, sortParamsArray, pageParams);
    }

    async getStatusById(statusId) {
        return await super.getById(statusId);
    }

    async createStatus(status) {
        return await super.create(status);
    }

    async updateStatus(status) {
        return await super.update(status);
    }

    async deleteStatus(statusId) {
        return await super.delete(statusId);
    }
}
