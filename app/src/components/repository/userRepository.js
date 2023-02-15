import { UniqueConstraintError, Op } from "sequelize";
import { db } from "../model/db.js";
import { comparePassword, hashPassword } from "../util/passwordHasher.js";
import { staticFilesFolder } from "../../app.js";
import DbBaseRepository from "./baseRepository.js";

export default class UserRepository extends DbBaseRepository {
    constructor() {
        super();
        this.type = "user";
    }
    async getUsers(filterOptions, sortParamsArray, pageParams) {
        return await super.getAll(filterOptions, sortParamsArray, pageParams);
    }

    async getUsersByNameOrLogin(nameOrLogin) {
        let users;
        try {
            users = await db.user.findAll({
                where: {
                    [Op.or]: [
                        {
                            name: {
                                [Op.like]: `%${nameOrLogin}%`,
                            },
                        },
                        {
                            email: {
                                [Op.like]: `%${nameOrLogin}%`,
                            },
                        },
                    ],
                },
            });
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
        return users;
    }

    async getUser(userId) {
        return await super.getById(userId);
    }

    async getUserByLoginAndPassword(login, password) {
        let user;
        try {
            const findedUser = await db.user.findOne({ where: { email: login } });
            if (!findedUser) {
                return null;
            }
            const isPasswordCorrect = await comparePassword(password, findedUser.password);
            if (!isPasswordCorrect) {
                return null;
            }
            user = findedUser;
        } catch (err) {
            throw new Error(err);
        }
        return user;
    }

    async createUser(user) {
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

    async updateUser(user) {
        if (user.password) {
            user.password = await hashPassword(user.password);
        }
        return await super.update(user);
    }

    async deleteUser(userId) {
        return await super.delete(userId);
    }

    getUserFolder(userId) {
        return `${staticFilesFolder}/users/${userId}`;
    }
}
