import BoardMarkRepository from "../repository/boardMarkRepository.js";
import { getFilterParams, getPageParams, getSortParamsArray } from "../service/queryParamsParser.js";
import sendJsonHttpResponse from "../service/httpMessageService.js";

export default class boardMarkController {
    boardMarkRepository;
    constructor() {
        this.boardMarkRepository = new BoardMarkRepository();
    }

    async getBoardMarkes(req, res) {
        const queryParams = req.query;
        const filterParams = getFilterParams(queryParams);
        const sortParamsArray = getSortParamsArray(queryParams);
        const pageParams = getPageParams(queryParams);
        let boardMarks;
        try {
            boardMarks = await this.boardMarkRepository.getMarks(filterParams, sortParamsArray, pageParams);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!boardMarks) {
            return sendJsonHttpResponse(res, 500, "Server can't get board marks");
        }
        return res.status(200).json(boardMarks);
    }

    async getBoardMarkById(req, res) {
        const boardMarkId = req.params.id;
        if (!boardMarkId) {
            return sendJsonHttpResponse(res, 400, "id did not send");
        }
        let findedBoardMark;
        try {
            findedBoardMark = await this.boardMarkRepository.getMarkById(boardMarkId);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!findedBoardMark) {
            return sendJsonHttpResponse(res, 404, "such board mark doesn't exist");
        }
        return res.status(200).json(findedBoardMark);
    }

    async createBoardMark(req, res) {
        const boardMark = req.body;
        let createdboardMark;
        try {
            createdboardMark = await this.boardMarkRepository.createMark(boardMark);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!createdboardMark) {
            return sendJsonHttpResponse(res, 400, "can't create board mark");
        }
        return res.status(201).json(createdboardMark);
    }

    async updateBoardMark(req, res) {
        const boardMarkId = req.body.id;
        if (!boardMarkId) {
            return sendJsonHttpResponse(res, 400, "id did not send");
        }
        const boardMark = req.body;
        let updatedboardMark;
        try {
            updatedboardMark = await this.boardMarkRepository.updateMark(boardMark);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!updatedboardMark) {
            return sendJsonHttpResponse(res, 404, "such board mark doesn't exist");
        }
        return res.status(200).json(updatedboardMark);
    }

    async deleteBoardMark(req, res) {
        const id = req.params.id;
        if (!id) {
            return sendJsonHttpResponse(res, 400, "id did not send");
        }
        let isDeleted;
        try {
            isDeleted = await this.boardMarkRepository.deleteMark(id);
        } catch (err) {
            return sendJsonHttpResponse(res, 500, "Database error");
        }
        if (!isDeleted) {
            return sendJsonHttpResponse(res, 404, "such board mark doesn't exist");
        }
        return sendJsonHttpResponse(res, 204, "board mark deleted");
    }
}
