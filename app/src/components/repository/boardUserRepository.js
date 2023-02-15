import DbBaseRepository from "./baseRepository.js";

export default class BoardUserRepository extends DbBaseRepository {
    constructor() {
        super();
        this.type = "boardUser";
    }
    async getBoardUsers(filterOptions = {}, sortParamsArray = [], pageParams = {}) {
        return await super.getAll(filterOptions, sortParamsArray, pageParams);
    }

    async getBoardUserById(boardUserId) {
        return await super.getById(boardUserId);
    }

    async createBoardUser(boardUser) {
        return await super.create(boardUser);
    }

    async updateBoardUser(boardUser) {
        return await super.update(boardUser);
    }

    async deleteBoardUser(boardUserId) {
        return await super.delete(boardUserId);
    }
}
