import BoardUserRepository from "../repository/boardUserRepository.js";
import { getFilterParams, getPageParams, getSortParamsArray } from "../service/queryParamsParser.js";
import sendJsonHttpResponse from "../service/httpMessageService.js";

export default class boardUserController {
    boardUserRepository;
    constructor() {
        this.boardUserRepository = new BoardUserRepository();
    }

    async getBoardUsers(req, res) {
        const queryParams = req.query;
        const filterParams = getFilterParams(queryParams);
        const sortParamsArray = getSortParamsArray(queryParams);
        const pageParams = getPageParams(queryParams);
        let boardUsers;
        try {
            boardUsers = await this.boardUserRepository.getBoardUsers(filterParams, sortParamsArray, pageParams);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!boardUsers) {
            return sendJsonHttpResponse(res, 500, "Server can't get board users");
        }
        return res.status(200).json(boardUsers);
    }

    async getBoardUserById(req, res) {
        const boardUserId = req.params.id;
        if (!boardUserId) {
            return sendJsonHttpResponse(res, 400, "id didn't send");
        }
        let findedBoardUser;
        try {
            findedBoardUser = await this.boardUserRepository.getBoardUserById(boardUserId);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!findedBoardUser) {
            return sendJsonHttpResponse(res, 404, "such board user doesn't exist");
        }
        return res.status(200).json(findedBoardUser);
    }

    async createBoardUser(req, res) {
        const boardUser = req.body;
        let createdBoardUser;
        try {
            createdBoardUser = await this.boardUserRepository.createBoardUser(boardUser);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!createdBoardUser) {
            return sendJsonHttpResponse(res, 400, "can't create board user");
        }
        return res.status(201).json(createdBoardUser);
    }

    async updateBoardUser(req, res) {
        const boardUserId = req.body.id;
        if (!boardUserId) {
            return sendJsonHttpResponse(res, 400, "id didn't send");
        }
        const boardUser = req.body;
        let updatedboardUser;
        try {
            updatedboardUser = await this.boardUserRepository.updateBoardUser(boardUser);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!updatedboardUser) {
            return sendJsonHttpResponse(res, 404, "such board user doesn't exist");
        }
        return res.status(200).json(updatedboardUser);
    }

    async deleteBoardUser(req, res) {
        const id = req.params.id;
        if (!id) {
            return sendJsonHttpResponse(res, 400, "id didn't send");
        }
        let isDeleted;
        try {
            isDeleted = await this.boardUserRepository.deleteBoardUser(id);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!isDeleted) {
            return sendJsonHttpResponse(res, 404, "such board user doesn't exist");
        }
        return sendJsonHttpResponse(res, 204, "board user deleted");
    }
}
