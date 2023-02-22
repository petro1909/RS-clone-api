"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
    class BoardUser extends Model {
        static associate(db) {
            db.board.belongsToMany(db.user, { through: db.boardUser, onDelete: "CASCADE", onUpdate: "CASCADE" });
            db.user.belongsToMany(db.board, { through: db.boardUser, onDelete: "CASCADE", onUpdate: "CASCADE" });
        }
    }
    BoardUser.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            role: {
                type: DataTypes.ENUM,
                values: ["ADMIN", "VIEWER", "PARTICIPANT"],
            },
        },
        {
            sequelize,
            modelName: "boardUser",
        }
    );
    return BoardUser;
};
