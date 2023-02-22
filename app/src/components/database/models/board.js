"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
    class Board extends Model {
        static associate(db) {
            db.board.hasMany(db.boardMark, { onDelete: "CASCADE", onUpdate: "CASCADE" });
            db.board.hasMany(db.status, { onDelete: "CASCADE", onUpdate: "CASCADE" });
        }
    }
    Board.init(
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
        },
        {
            sequelize,
            modelName: "board",
        }
    );
    return Board;
};
