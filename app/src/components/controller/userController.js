import { getFilterParams, getPageParams, getSearchParams, getSortParamsArray } from "../service/queryParamsParser.js";
import UserRepository from "../repository/userRepository.js";

import { createFile, deleteFile, getStaticFile } from "../service/fileService.js";
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
        let users;
        try {
            if (nameOrLogin) {
                users = await this.userRepository.getUsersByNameOrLogin(nameOrLogin);
            } else {
                const filterParams = getFilterParams(queryParams);
                const sortParams = getSortParamsArray(queryParams);
                const pageParams = getPageParams(queryParams);
                users = await this.userRepository.getUsers(filterParams, sortParams, pageParams);
            }
        } catch (err) {
            res.status(500).send("Database error");
            return;
        }
        if (!users) {
            res.status(500).send("Server can't get users");
            return;
        }
        res.status(200).json(users);
    }

    async getUserById(req, res) {
        const id = req.params.id;
        if (!id) {
            res.status(400).send("id didn't sent");
            return;
        }
        let findedUser;
        try {
            findedUser = await this.userRepository.getUser(id);
        } catch (err) {
            res.status(500).send("Database error");
            return;
        }
        if (!findedUser) {
            res.status(404).send(`such user doesn't exist`);
            return;
        }
        res.status(200).json(findedUser);
    }

    async loginUser(req, res) {
        const email = req.body.email;
        if (!email) {
            res.status(400).send("email can not be empty");
            return;
        }
        const password = req.body.password;
        if (!password) {
            res.status(400).send("password can not be empty");
            return;
        }
        let findedUser;
        try {
            findedUser = await this.userRepository.getUserByLoginAndPassword(email, password);
        } catch (err) {
            res.status(500).send("Database error");
            return;
        }
        if (!findedUser) {
            res.status(404).send(`login or password not correct`);
            return;
        }
        const token = generateToken(findedUser);
        res.status(200).json({ findedUser, token });
    }

    async registerUser(req, res) {
        const name = req.body.name;
        const email = req.body.email;
        if (!email) {
            res.status(400).send("email can not be empty");
            return;
        }
        const password = req.body.password;
        if (!password) {
            res.status(400).send("password can not be empty");
            return;
        }
        const user = { name: name, email: email, password: password, role: "USER" };
        let createdUser;
        try {
            createdUser = await this.userRepository.createUser(user);
        } catch (err) {
            res.status(500).send("Database error");
            return;
        }
        if (!createdUser) {
            res.status(400).send(`user with such email already exist`);
            return;
        }
        res.status(201).json(createdUser);
    }

    async updateUser(req, res) {
        const userId = req.body.id;
        if (!userId) {
            res.status(404).send("id does't sent");
            return;
        }
        const user = req.body;
        let updatedUser;
        try {
            updatedUser = await this.userRepository.updateUser(user);
        } catch (err) {
            console.log(err);
            res.status(500).send("Database error");
            return;
        }
        if (!updatedUser) {
            res.status(404).send(`such user doesn't exist`);
            return;
        }
        res.status(200).json(updatedUser);
    }

    async deleteUser(req, res) {
        const id = req.params.id;
        if (!id) {
            res.status(404).send("id does't sent");
            return;
        }
        let isDeleted;
        try {
            isDeleted = await this.userRepository.deleteUser(id);
        } catch (err) {
            res.status(500).send("Database error");
            return;
        }
        if (!isDeleted) {
            res.status(404).send(`user with id ${id} doesn't exist`);
            return;
        }
        res.status(204).send("user deleted");
    }

    async getUserProfilePicture(req, res) {
        const userId = req.params.id;
        let findedUser;
        try {
            findedUser = await this.userRepository.getUser(userId);
        } catch (err) {
            return res.status(500).send("Database error");
        }
        const profilePictureName = findedUser.profilePicture;
        if (!profilePictureName) {
            return res.status(404).send("User doesn't have profile picture");
        }
        const userFolder = this.userRepository.getUserFolder(userId);
        const userPicture = await getStaticFile(userFolder, profilePictureName);
        if (userPicture) {
            return res.json({ profilePicture: `/users/${userId}/${profilePictureName}` });
        } else {
            return res.status(404).send("Can't access file");
        }
    }

    async uploadUserProfilePicture(req, res) {
        const id = req.params.id;
        let findedUser;
        try {
            findedUser = await this.userRepository.getUser(id);
        } catch (err) {
            return res.status(500).send("Database error");
        }
        if (!findedUser) {
            return res.status(404).send(`user with id ${id} doesn't exist`);
        }
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }
        const picture = req.files.profile;
        let userFolder = this.userRepository.getUserFolder(id);

        const isCreated = createFile(userFolder, picture, true);
        if (isCreated) {
            const upatedUser = { profilePicture: picture.name };
            await this.userRepository.updateUser(id, upatedUser);
            return res.json({ profilePicture: `/users/${findedUser.id}/${picture.name}` });
        } else {
            return res.status(500).send("Can't upload file");
        }
    }

    async deleteUserProfilePicture(req, res) {
        const userId = req.params.id;
        const user = { profilePicture: null };
        let profilePictureName;
        try {
            const findedUser = await this.userRepository.getUser(userId);
            if (!findedUser) {
                return sendJsonHttpResponse(res, 404, "user not found");
            }
            profilePictureName = findedUser.profilePicture;
            await this.userRepository.updateUser(userId, user);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        const userFolder = this.userRepository.getUserFolder(userId);
        const isDeleted = await deleteFile(userFolder, profilePictureName);
        if (isDeleted) {
            return sendJsonHttpResponse(res, 204, "picture deleted");
        } else {
            return sendJsonHttpResponse(res, 404, "can't delete picture");
        }
    }
}
