import RequestLogRepository from "../repository/requestLogRepository.js";
import UserRepository from "../repository/userRepository.js";
import sendJsonHttpResponse from "../service/httpMessageService.js";
import { getFilterParams, getPageParams, getSortParamsArray } from "../service/queryParamsParser.js";

export default class AdminController {
    userRepository;
    constructor() {
        this.userRepository = new UserRepository();
        this.requestLogRepository = new RequestLogRepository();
    }

    async updateUser(req, res) {
        const userId = req.body.id;
        if (!userId) {
            return sendJsonHttpResponse(res, 400, "Id didn't sent");
        }
        let findedUser;
        try {
            findedUser = await this.userRepository.getUser(userId);
            if (findedUser.role === "SUPERADMIN") {
                return sendJsonHttpResponse(res, 400, "Can't update superadmin");
            }
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
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
        const currUser = req.user;
        if (currUser.id === id) {
            return sendJsonHttpResponse(res, 400, "Can't delete current user");
        }
        try {
            const findedUser = await this.userRepository.getUser(id);
            if (findedUser.role === "SUPERADMIN") {
                return sendJsonHttpResponse(res, 400, "Can't delete superadmin");
            }
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
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

    async getStatistics(req, res) {
        const queryParams = req.query;
        const filterParams = getFilterParams(queryParams);
        const sortParamsArray = getSortParamsArray(queryParams);
        const pageParams = getPageParams(queryParams);
        let requestLogArray;
        try {
            requestLogArray = await this.requestLogRepository.getRequestLogs(filterParams, sortParamsArray, pageParams);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!requestLogArray) {
            return sendJsonHttpResponse(res, 500, "Server can't get request logs");
        }
        return res.status(200).json(requestLogArray);
    }

    async getStatisticById(req, res) {
        const id = req.params.id;
        if (!id) {
            return sendJsonHttpResponse(res, 400, "id didn't sent");
        }
        let findedRequestLog;
        try {
            findedRequestLog = await this.requestLogRepository.getRequestLogId(id);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!findedRequestLog) {
            return sendJsonHttpResponse(res, 404, "such request log doesn't exist");
        }
        return res.status(200).json(findedRequestLog);
    }

    async deleteStatistic(req, res) {
        const id = req.params.id;
        if (!id) {
            return sendJsonHttpResponse(res, 400, "id didn't sent");
        }
        let isDeleted;
        try {
            isDeleted = await this.requestLogRepository.deleteRequestLog(id);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!isDeleted) {
            return sendJsonHttpResponse(res, 404, "such request log doesn't exist");
        }
        return sendJsonHttpResponse(res, 204, "request log deleted");
    }
}
