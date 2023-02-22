"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
    class TaskUser extends Model {
        static associate(db) {
            db.task.belongsToMany(db.boardUser, { through: db.taskUser, onDelete: "CASCADE", onUpdate: "CASCADE" });
            db.boardUser.belongsToMany(db.task, { through: db.taskUser, onDelete: "CASCADE", onUpdate: "CASCADE" });
        }
    }
    TaskUser.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
        },
        {
            sequelize,
            modelName: "taskUser",
        }
    );
    return TaskUser;
};
