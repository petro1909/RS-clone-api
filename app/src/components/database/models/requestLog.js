"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
    class RequestLog extends Model {}
    RequestLog.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            logDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            method: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            os: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            browser: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "requestLog",
        }
    );
    return RequestLog;
};
