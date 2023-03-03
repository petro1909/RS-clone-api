import BoardRepository from "../repository/boardRepository.js";
import sendJsonHttpResponse from "../service/httpMessageService.js";
import { getFilterParams, getPageParams, getSortParamsArray } from "../service/queryParamsParser.js";

export default class BoardController {
    userBoardRepository;
    constructor() {
        this.userBoardRepository = new BoardRepository();
    }

    async getUserBoards(req, res) {
        const queryParams = req.query;
        const userId = req.user.id;
        if (!queryParams.userId) {
            queryParams.userId = userId;
        }
        const filterParams = getFilterParams(queryParams);
        const pageParams = getPageParams(queryParams);
        const sortParamsArray = getSortParamsArray(queryParams);
        let userBoards;
        try {
            userBoards = await this.userBoardRepository.getUserBoards(filterParams, sortParamsArray, pageParams);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!userBoards) {
            return sendJsonHttpResponse(res, 500, "Server can't get user boards");
        }
        return res.status(200).json(userBoards);
    }

    async getUserBoardById(req, res) {
        const id = req.params.id;
        if (!id) {
            return sendJsonHttpResponse(res, 400, "id didn't send");
        }
        let findedUserBoard;
        try {
            findedUserBoard = await this.userBoardRepository.getBoardById(id);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!findedUserBoard) {
            return sendJsonHttpResponse(res, 404, "such userBoard doesn't exist");
        }
        return res.status(200).json(findedUserBoard);
    }

    async createUserBoard(req, res) {
        const board = req.body;
        const userId = req.user.id;

        let createdUserBoard;
        try {
            createdUserBoard = await this.userBoardRepository.createBoard(board, userId);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!createdUserBoard) {
            return sendJsonHttpResponse(res, 400, "can't create user board");
        }
        return res.status(201).json(createdUserBoard);
    }

    async updateUserBoard(req, res) {
        const boardId = req.body.id;
        if (!boardId) {
            return sendJsonHttpResponse(res, 400, "id didn't send");
        }
        const userBoard = req.body;
        let updatedUserBoard;
        try {
            updatedUserBoard = await this.userBoardRepository.updateBoard(userBoard);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!updatedUserBoard) {
            return sendJsonHttpResponse(res, 404, "such user board doesn't exist");
        }
        return res.status(200).json(updatedUserBoard);
    }

    async deleteUserBoard(req, res) {
        const id = req.params.id;
        if (!id) {
            return sendJsonHttpResponse(res, 400, "id didn't send");
        }
        let isDeleted;
        try {
            isDeleted = await this.userBoardRepository.deleteBoard(id);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!isDeleted) {
            return sendJsonHttpResponse(res, 404, "such user board doesn't exist");
        }
        return sendJsonHttpResponse(res, 204, "user board deleted");
    }
}
