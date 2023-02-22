"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
    class Task extends Model {
        static associate(db) {
            db.task.hasMany(db.taskAttachment, { onDelete: "CASCADE", onUpdate: "CASCADE" });
        }
    }
    Task.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            order: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            done: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            startDate: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            endDate: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "task",
        }
    );
    return Task;
};
