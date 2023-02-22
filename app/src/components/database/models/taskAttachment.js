"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
    class TaskAttachment extends Model {}
    TaskAttachment.init(
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
            type: {
                type: DataTypes.ENUM,
                values: ["FILE", "HYPERLINK"],
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "taskAttachment",
        }
    );
    return TaskAttachment;
};
