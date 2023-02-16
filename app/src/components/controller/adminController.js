import UserRepository from "../repository/userRepository.js";
import sendJsonHttpResponse from "../service/httpMessageService.js";

export default class AdminController {
    userRepository;
    constructor() {
        this.userRepository = new UserRepository();
    }

    async updateUser(req, res) {
        const userId = req.body.id;
        if (!userId) {
            return sendJsonHttpResponse(res, 400, "Id didn't sent");
        }
        const user = { role: req.body.role };
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
