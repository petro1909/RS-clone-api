import { UniqueConstraintError } from "sequelize";
import { db } from "../model/db.js";
import { comparePassword, hashPassword } from "../util/passwordHasher.js";

export default class UserService {
    async getUsers(filterOptions, sortParamsArray, pageParams) {
        let users;
        try {
            users = await db.user.findAll({
                where: filterOptions,
                order: sortParamsArray,
                offset: pageParams.offset,
                limit: pageParams.limit,
            });
        } catch (err) {
            throw new Error(err);
        }
        return users;
    }

    async getUser(userId) {
        let user;
        try {
            user = await db.user.findByPk(userId);
        } catch (err) {
            throw new Error(err);
        }
        return user;
    }

    async getUserByLoginAndPassword(login, password) {
        let user;
        try {
            const findedUser = await db.user.findOne({ where: { email: login } });
            if (!findedUser) {
                return null;
            }
            const isPasswordCorrect = comparePassword(password, user.password);
            if (!isPasswordCorrect) {
                return null;
            }
            user = findedUser;
        } catch (err) {
            throw new Error(err);
        }
        return user;
    }

    async createUser(name, email, password, role = "USER") {
        const user = { name: name, email: email, password: password, role: role };
        user.password = await hashPassword(user.password);
        let createdUser;
        try {
            createdUser = await db.user.create(user);
        } catch (err) {
            if (err instanceof UniqueConstraintError) {
                console.log("Duplicate error");
            } else {
                throw new Error(err);
            }
        }
        return createdUser;
    }

    async updateUser(userId, user) {
        user.password = await hashPassword(user.password);
        let updatedUser;
        try {
            updatedUser = await db.user.update(user, { where: { id: userId } });
        } catch (err) {
            throw new Error(err);
        }
        return updatedUser;
    }

    async deleteUser(userId) {
        let isDeleted;
        try {
            isDeleted = await db.user.destroy({ where: { id: userId } });
        } catch (err) {
            throw new Error(err);
        }
        return isDeleted;
    }
}
