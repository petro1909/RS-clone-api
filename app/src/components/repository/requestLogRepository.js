import DbBaseRepository from "./baseRepository.js";

export default class RequestLogRepository extends DbBaseRepository {
    constructor() {
        super();
        this.type = "requestLog";
    }
    async getRequestLogs(filterOptions = {}, sortParamsArray = [], pageParams = {}) {
        return await super.getAll(filterOptions, sortParamsArray, pageParams);
    }

    async getRequestLogId(requestLogId) {
        return await super.getById(requestLogId);
    }

    async createRequestLog(requestLog) {
        return await super.create(requestLog);
    }

    async updateRequestLog(requestLog) {
        return await super.update(requestLog);
    }

    async deleteRequestLog(requestLogId) {
        return await super.delete(requestLogId);
    }
}
