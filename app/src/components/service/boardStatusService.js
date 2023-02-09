import { db } from "../model/db.js";

export default class BoardStatusService {
    async getStatuses(filterOptions = {}, sortParamsArray = [], pageParams = {}) {
        let statuses;
        try {
            statuses = await db.status.findAll({
                where: filterOptions,
                order: sortParamsArray,
                offset: pageParams.offset,
                limit: pageParams.limit,
            });
        } catch (err) {
            throw new Error(err);
        }
        return statuses;
    }

    async getStatusById(statusId) {
        let status;
        try {
            status = await db.status.findByPk(statusId);
        } catch (err) {
            throw new Error(err);
        }
        return status;
    }

    async createStatus(status) {
        let createdStatus;
        try {
            createdStatus = await db.status.create(status);
        } catch (err) {
            throw new Error(err);
        }
        return createdStatus;
    }

    async updateStatus(statusId, status) {
        let updatedStatusResult;
        try {
            updatedStatusResult = await db.status.update(status, {
                where: { id: statusId },
                returning: true,
                plain: true,
            });
        } catch (err) {
            throw new Error(err);
        }
        const updatedStatus = updatedStatusResult[1].dataValues;
        return updatedStatus;
    }

    async deleteStatus(statusId) {
        let isDeleted;
        try {
            isDeleted = await db.status.destroy({ where: { id: statusId } });
        } catch (err) {
            throw new Error(err);
        }
        return isDeleted;
    }
}
