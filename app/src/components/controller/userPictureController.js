import UserRepository from "../repository/userRepository.js";

import { createFile, deleteFile, getStaticFile } from "../service/fileService.js";
import sendJsonHttpResponse from "../service/httpMessageService.js";

export default class UserPictureController {
    userRepository;
    constructor() {
        this.userRepository = new UserRepository();
    }

    async getUserProfilePicture(req, res) {
        const userId = req.params.id;
        let findedUser;
        try {
            findedUser = await this.userRepository.getUser(userId);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        const profilePictureName = findedUser.profilePicture;
        if (!profilePictureName) {
            return sendJsonHttpResponse(res, 404, "User doesn't have profile picture");
        }
        const userFolder = this.userRepository.getUserFolder(userId);
        const userPicture = await getStaticFile(userFolder, profilePictureName);
        if (userPicture) {
            return res.json({ profilePicture: `/users/${userId}/${profilePictureName}` });
        } else {
            return sendJsonHttpResponse(res, 404, "Can't access file");
        }
    }

    async uploadUserProfilePicture(req, res) {
        const id = req.params.id;
        let findedUser;
        try {
            findedUser = await this.userRepository.getUser(id);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!findedUser) {
            return sendJsonHttpResponse(res, 404, "such user with doesn't exist");
        }
        if (!req.files) {
            return sendJsonHttpResponse(res, 400, "No files were uploaded");
        }
        const picture = req.files.profile;
        let userFolder = this.userRepository.getUserFolder(id);

        const isCreated = await createFile(userFolder, picture, true);
        if (isCreated) {
            const upatedUser = { id: id, profilePicture: picture.name };
            try {
                await this.userRepository.updateUser(upatedUser);
            } catch (err) {
                return sendJsonHttpResponse(res, 500, "Database error");
            }
            return res.status(200).json({ profilePicture: `/users/${findedUser.id}/${picture.name}` });
        } else {
            return sendJsonHttpResponse(res, 500, "Can't upload file");
        }
    }

    async deleteUserProfilePicture(req, res) {
        const userId = req.params.id;
        const user = { id: userId, profilePicture: null };
        let profilePictureName;
        try {
            const findedUser = await this.userRepository.getUser(userId);
            if (!findedUser) {
                return sendJsonHttpResponse(res, 404, "user not found");
            }
            profilePictureName = findedUser.profilePicture;
            await this.userRepository.updateUser(user);
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
