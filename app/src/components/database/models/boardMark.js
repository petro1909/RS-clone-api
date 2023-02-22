"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
    class BoardMark extends Model {}
    BoardMark.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            color: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "boardMark",
        }
    );
    return BoardMark;
};
