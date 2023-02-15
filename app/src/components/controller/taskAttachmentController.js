import TaskAttachmentRepository from "../repository/taskAttachmentRepository.js";

import { createFile, deleteFile, getStaticFile } from "../service/fileService.js";

export default class UserController {
    taskAttachmentRepository;
    constructor() {
        this.taskAttachmentRepository = new TaskAttachmentRepository();
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
            return res.status(404).send("User does't have profile picture");
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
                return res.status(404).send(`user with id ${req.body.id} doesn't exist`);
            }
            profilePictureName = findedUser.profilePicture;
            await this.userRepository.updateUser(userId, user);
        } catch (err) {
            return res.status(500).send("Database error");
        }
        const userFolder = this.userRepository.getUserFolder(userId);
        const isDeleted = await deleteFile(userFolder, profilePictureName);
        if (isDeleted) {
            res.status(204).send("picture deleted");
        } else {
            return res.status(404).send("can't delete picture");
        }
    }
}
