import DbBaseRepository from "./baseRepository.js";

export default class BoardMarkService extends DbBaseRepository {
    constructor() {
        super();
        this.type = "boardMark";
    }

    async getMarks(filterOptions = {}, sortParamsArray = [], pageParams = {}) {
        return await super.getAll(filterOptions, sortParamsArray, pageParams);
    }

    async getMarkById(markId) {
        return await super.getById(markId);
    }

    async createMark(mark) {
        return await super.create(mark);
    }

    async updateMark(mark) {
        return await super.update(mark);
    }

    async deleteMark(markId) {
        return await super.delete(markId);
    }
}
