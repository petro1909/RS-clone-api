import { getSearchParams } from "../service/queryParamsParser.js";
import UserRepository from "../repository/userRepository.js";
import { generateToken } from "../middleware/authService.js";
import sendJsonHttpResponse from "../service/httpMessageService.js";

export default class UserController {
    userRepository;
    constructor() {
        this.userRepository = new UserRepository();
    }

    async getUsers(req, res) {
        const queryParams = req.query;
        const nameOrLogin = getSearchParams(queryParams);
        let users = [];
        try {
            if (nameOrLogin) {
                users = await this.userRepository.getUsersByNameOrLogin(nameOrLogin);
            } else {
                users = await this.userRepository.getUsers();
            }
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!users) {
            return sendJsonHttpResponse(res, 500, "Server can't get users");
        }
        return res.status(200).json(users);
    }

    async getUserById(req, res) {
        const id = req.params.id;
        if (!id) {
            return sendJsonHttpResponse(res, 400, "Id didn't sent");
        }
        let findedUser;
        try {
            findedUser = await this.userRepository.getUser(id);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!findedUser) {
            return sendJsonHttpResponse(res, 404, "such user doesn't exist");
        }
        res.status(200).json(findedUser);
    }

    async loginUser(req, res) {
        const email = req.body.email;
        if (!email) {
            return sendJsonHttpResponse(res, 400, "email can not be empty");
        }
        const password = req.body.password;
        if (!password) {
            return sendJsonHttpResponse(res, 400, "password can not be empty");
        }
        let findedUser;
        try {
            findedUser = await this.userRepository.getUserByLoginAndPassword(email, password);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!findedUser) {
            return sendJsonHttpResponse(res, 404, "login or password is not correct");
        }
        const token = generateToken(findedUser);
        res.status(200).json({ findedUser, token });
    }

    async registerUser(req, res) {
        const name = req.body.name;
        const email = req.body.email;
        if (!email) {
            return sendJsonHttpResponse(res, 400, "email can not be empty");
        }
        const password = req.body.password;
        if (!password) {
            return sendJsonHttpResponse(res, 400, "password can not be empty");
        }
        const user = { name: name, email: email, password: password, role: "USER" };
        let createdUser;
        try {
            createdUser = await this.userRepository.createUser(user);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!createdUser) {
            return sendJsonHttpResponse(res, 400, "user with such email already exist");
        }
        res.status(201).json(createdUser);
    }

    async updateUser(req, res) {
        const userId = req.body.id;
        if (!userId) {
            return sendJsonHttpResponse(res, 400, "Id didn't sent");
        }
        const user = req.body;
        let updatedUser;
        try {
            updatedUser = await this.userRepository.updateUser(user);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!updatedUser) {
            return sendJsonHttpResponse(res, 404, "such user doesn't exist");
        }
        res.status(200).json(updatedUser);
    }

    async deleteUser(req, res) {
        const id = req.params.id;
        if (!id) {
            return sendJsonHttpResponse(res, 400, "Id didn't sent");
        }
        let isDeleted;
        try {
            isDeleted = await this.userRepository.deleteUser(id);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!isDeleted) {
            return sendJsonHttpResponse(res, 404, "such user doesn't exist");
        }
        res.status(204).send("user deleted");
    }
}
