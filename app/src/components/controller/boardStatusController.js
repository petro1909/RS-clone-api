import BoardStatusRepository from "../repository/boardStatusRepository.js";
import { getSortParamsArray } from "../service/queryParamsParser.js";

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
            res.status(500).send("Database error");
            return;
        }
        if (!boardStatuses) {
            res.status(500).send("Server can't get board statuses");
            return;
        }
        res.status(200).json(boardStatuses);
    }

    async getBoardStatusById(req, res) {
        const boardStatusId = req.params.id;
        if (!boardStatusId) {
            res.status(400).send("id did not send");
            return;
        }
        let findedBoardStatus;
        try {
            findedBoardStatus = await this.boardStatusRepository.getStatusById(boardStatusId);
        } catch (err) {
            res.status(500).send("Database error");
            return;
        }
        if (!findedBoardStatus) {
            res.status(404).send(`board status with id ${boardStatusId} doesn't exist`);
            return;
        }
        res.status(200).json(findedBoardStatus);
    }

    async createBoardStatus(req, res) {
        const boardStatus = req.body;
        let createdboardStatus;
        try {
            createdboardStatus = await this.boardStatusRepository.createStatus(boardStatus);
        } catch (err) {
            res.status(500).send("Database error");
            return;
        }
        if (!createdboardStatus) {
            res.status(400).send(`can't create board status`);
            return;
        }
        res.status(201).json(createdboardStatus);
    }

    async updateBoardStatus(req, res) {
        const boardStatusId = req.body.id;
        if (!boardStatusId) {
            res.status(404).send("task id does't sent");
            return;
        }
        const boardStatus = req.body;
        let updatedboardStatus;
        try {
            updatedboardStatus = await this.boardStatusRepository.updateStatus(boardStatus);
        } catch (err) {
            res.status(500).send("Database error");
            return;
        }
        if (!updatedboardStatus) {
            res.status(404).send(`status with id ${boardStatusId} does't exist`);
            return;
        }
        res.status(200).json(updatedboardStatus);
    }

    async deleteBoardStatus(req, res) {
        const id = req.params.id;
        if (!id) {
            res.status(404).send("id does't sent");
            return;
        }
        let isDeleted;
        try {
            isDeleted = await this.boardStatusRepository.deleteStatus(id);
        } catch (err) {
            res.status(500).send("Database error");
            return;
        }
        if (!isDeleted) {
            res.status(404).send(`board status with id ${id} doesn't exist`);
            return;
        }
        res.status(204).send("board status deleted");
    }
}
