"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
    class TaskMark extends Model {
        static associate(db) {
            db.task.belongsToMany(db.boardMark, { through: db.taskMark, onDelete: "CASCADE", onUpdate: "CASCADE" });
            db.boardMark.belongsToMany(db.task, { through: db.taskMark, onDelete: "CASCADE", onUpdate: "CASCADE" });
        }
    }
    TaskMark.init(
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
            modelName: "taskMark",
        }
    );
    return TaskMark;
};
