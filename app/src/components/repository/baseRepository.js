import { db } from "../model/db.js";

export default class DbBaseRepository {
    async getAll(filterOptions = {}, sortParamsArray = [], pageParams = {}) {
        let entities;
        try {
            entities = await db[this.type].findAll({ where: filterOptions, order: sortParamsArray, offset: pageParams.offset, limit: pageParams.limit });
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
        return entities;
    }

    async getById(id) {
        let entity;
        try {
            entity = await db[this.type].findByPk(id);
        } catch (err) {
            throw new Error(err);
        }
        return entity;
    }
    async create(entity) {
        let createdEntity;
        try {
            console.log(entity);
            createdEntity = await db[this.type].create(entity);
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
        return createdEntity;
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
            throw new Error(err);
        }
        return isDeleted;
    }
}
