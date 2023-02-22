"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
    class Status extends Model {
        static associate(db) {
            db.status.hasMany(db.task, { onDelete: "CASCADE", onUpdate: "CASCADE" });
        }
    }
    Status.init(
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
        },
        {
            sequelize,
            modelName: "status",
        }
    );
    return Status;
};
