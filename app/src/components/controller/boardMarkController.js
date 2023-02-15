import BoardMarkRepository from "../repository/boardMarkRepository.js";
import { getSortParamsArray } from "../service/queryParamsParser.js";

export default class boardMarkController {
    boardMarkRepository;
    constructor() {
        this.boardMarkRepository = new BoardMarkRepository();
    }

    async getBoardMarkes(req, res) {
        const queryParams = req.query;
        const filterParams = { boardId: queryParams.boardId };
        const sortParamsArray = getSortParamsArray(queryParams);
        let boardMarks;
        try {
            boardMarks = await this.boardMarkRepository.getMarks(filterParams, sortParamsArray);
        } catch (err) {
            res.status(500).send("Database error");
            return;
        }
        if (!boardMarks) {
            res.status(500).send("Server can't get board Marks");
            return;
        }
        res.status(200).json(boardMarks);
    }

    async getBoardMarkById(req, res) {
        const boardMarkId = req.params.id;
        if (!boardMarkId) {
            res.status(400).send("id did not send");
            return;
        }
        let findedBoardMark;
        try {
            findedBoardMark = await this.boardMarkRepository.getMarkById(boardMarkId);
        } catch (err) {
            res.status(500).send("Database error");
            return;
        }
        if (!findedBoardMark) {
            res.status(404).send(`board status with id ${boardMarkId} doesn't exist`);
            return;
        }
        res.status(200).json(findedBoardMark);
    }

    async createBoardMark(req, res) {
        const boardMark = req.body;
        let createdboardMark;
        try {
            createdboardMark = await this.boardMarkRepository.createMark(boardMark);
        } catch (err) {
            res.status(500).send("Database error");
            return;
        }
        if (!createdboardMark) {
            res.status(400).send(`can't create board status`);
            return;
        }
        res.status(201).json(createdboardMark);
    }

    async updateBoardMark(req, res) {
        const boardMarkId = req.body.id;
        if (!boardMarkId) {
            res.status(404).send("task id does't sent");
            return;
        }
        const boardMark = req.body;
        let updatedboardMark;
        try {
            updatedboardMark = await this.boardMarkRepository.updateMark(boardMark);
        } catch (err) {
            res.status(500).send("Database error");
            return;
        }
        if (!updatedboardMark) {
            res.status(404).send(`status with id ${boardMarkId} does't exist`);
            return;
        }
        res.status(200).json(updatedboardMark);
    }

    async deleteBoardMark(req, res) {
        const id = req.params.id;
        if (!id) {
            res.status(404).send("id does't sent");
            return;
        }
        let isDeleted;
        try {
            isDeleted = await this.boardMarkRepository.deleteMark(id);
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
