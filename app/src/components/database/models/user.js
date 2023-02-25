"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
    class User extends Model {}
    User.init(
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
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.ENUM,
                values: ["SUPERADMIN", "ADMIN", "USER"],
                allowNull: true,
            },
            profilePicture: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "user",
        }
    );
    return User;
};
