import BoardStatusRepository from "../repository/boardStatusRepository.js";
import { getSortParamsArray } from "../service/queryParamsParser.js";
import sendJsonHttpResponse from "../service/httpMessageService.js";

export default class boardStatusController {
    boardStatusRepository;
    constructor() {
        this.boardStatusRepository = new BoardStatusRepository();
    }

    async getBoardStatuses(req, res) {
        const queryParams = req.query;
        const filterParams = { boardId: queryParams.boardId };
        const sortParamsArray = getSortParamsArray(queryParams);
        let boardStatuses;
        try {
            boardStatuses = await this.boardStatusRepository.getStatuses(filterParams, sortParamsArray);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!boardStatuses) {
            return sendJsonHttpResponse(res, 500, "Server can't get board statuses");
        }
        return res.status(200).json(boardStatuses);
    }

    async getBoardStatusById(req, res) {
        const boardStatusId = req.params.id;
        if (!boardStatusId) {
            return sendJsonHttpResponse(res, 400, "id didn't sent");
        }
        let findedBoardStatus;
        try {
            findedBoardStatus = await this.boardStatusRepository.getStatusById(boardStatusId);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!findedBoardStatus) {
            return sendJsonHttpResponse(res, 404, "such status doesn't exist");
        }
        return res.status(200).json(findedBoardStatus);
    }

    async createBoardStatus(req, res) {
        const boardStatus = req.body;
        let createdboardStatus;
        try {
            createdboardStatus = await this.boardStatusRepository.createStatus(boardStatus);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!createdboardStatus) {
            return sendJsonHttpResponse(res, 400, "can't create board status");
        }
        return res.status(201).json(createdboardStatus);
    }

    async updateBoardStatus(req, res) {
        const boardStatusId = req.body.id;
        if (!boardStatusId) {
            return sendJsonHttpResponse(res, 400, "id didn't sent");
        }
        const boardStatus = req.body;
        let updatedboardStatus;
        try {
            updatedboardStatus = await this.boardStatusRepository.updateStatus(boardStatus);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!updatedboardStatus) {
            return sendJsonHttpResponse(res, 404, "such status doesn't exist");
        }
        return res.status(200).json(updatedboardStatus);
    }

    async deleteBoardStatus(req, res) {
        const id = req.params.id;
        if (!id) {
            return sendJsonHttpResponse(res, 400, "id didn't sent");
        }
        let isDeleted;
        try {
            isDeleted = await this.boardStatusRepository.deleteStatus(id);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!isDeleted) {
            return sendJsonHttpResponse(res, 404, "such status doesn't exist");
        }
        return sendJsonHttpResponse(res, 204, "board status deleted");
    }
}
