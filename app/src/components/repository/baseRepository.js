import { db } from "../database/index.js";
import ErrorLoggerService, { logLevels } from "../service/errorLoggerService.js";

export default class DbBaseRepository {
    constructor() {
        this.errorLoggerService = new ErrorLoggerService();
    }
    async getAll(filterOptions = {}, sortParamsArray = [], pageParams = {}) {
        let entities;
        try {
            entities = await db[this.type].findAll({ where: filterOptions, order: sortParamsArray, offset: pageParams.offset, limit: pageParams.limit });
        } catch (err) {
            await this.errorLoggerService.makeLog(logLevels.ERROR, err);
            throw new Error(err);
        }
        if (!entities) {
            return null;
        }
        return entities.map((entity) => {
            if (entity.dataValues) {
                return entity.dataValues;
            } else {
                return entity;
            }
        });
    }

    async getById(id) {
        let entity;
        try {
            entity = await db[this.type].findByPk(id);
        } catch (err) {
            await this.errorLoggerService.makeLog(logLevels.ERROR, err);
            throw new Error(err);
        }
        if (entity.dataValues) {
            return entity.dataValues;
        } else {
            return entity;
        }
    }
    async create(entity) {
        let createdEntity;
        try {
            createdEntity = await db[this.type].create(entity);
        } catch (err) {
            await this.errorLoggerService.makeLog(logLevels.ERROR, err);
            throw new Error(err);
        }
        if (createdEntity.dataValues) {
            return createdEntity.dataValues;
        } else {
            return createdEntity;
        }
    }

    async update(entity) {
        let updatedEntityResult;
        const entityId = entity.id;
        delete entity.id;
        try {
            updatedEntityResult = await db[this.type].update(entity, {
                where: { id: entityId },
                returning: true,
                plain: true,
            });
        } catch (err) {
            await this.errorLoggerService.makeLog(logLevels.ERROR, err);
            throw new Error(err);
        }
        if (!updatedEntityResult[1]) {
            return null;
        }
        const updatedEntity = updatedEntityResult[1].dataValues;
        return updatedEntity;
    }

    async delete(id) {
        let isDeleted;
        try {
            isDeleted = await db[this.type].destroy({ where: { id: id } });
        } catch (err) {
            await this.errorLoggerService.makeLog(logLevels.ERROR, err);
            throw new Error(err);
        }
        return isDeleted;
    }
}
