import { db } from "../database/index.js";

export default class DbBaseRepository {
    async getAll(filterOptions = {}, sortParamsArray = [], pageParams = {}) {
        let entities;
        try {
            entities = await db[this.type].findAll({ where: filterOptions, order: sortParamsArray, offset: pageParams.offset, limit: pageParams.limit });
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
        return entities.map((entity) => entity.dataValues);
    }

    async getById(id) {
        let entity;
        try {
            entity = await db[this.type].findByPk(id);
        } catch (err) {
            throw new Error(err);
        }
        return entity.dataValues;
    }
    async create(entity) {
        let createdEntity;
        try {
            createdEntity = await db[this.type].create(entity);
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
        console.log(createdEntity);
        return createdEntity.dataValues;
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
