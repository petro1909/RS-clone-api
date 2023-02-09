import BoardUserService from "../service/boardUserService.js";
import { getSortParamsArray } from "../util/queryParamsParser.js";

export default class boardUserController {
    boardUserService;
    constructor() {
        this.boardUserService = new BoardUserService();
    }

    async getBoardUsers(req, res) {
        const queryParams = req.query;
        const filterParams = { boardId: queryParams.boardId };
        const sortParamsArray = getSortParamsArray(queryParams);
        let boardUsers;
        try {
            boardUsers = await this.boardUserService.getBoardUsers(filterParams, sortParamsArray);
        } catch (err) {
            res.status(500).send("Database error");
            return;
        }
        if (!boardUsers) {
            res.status(500).send("Server can't get board users");
            return;
        }
        res.status(200).json(boardUsers);
    }

    async getBoardUserById(req, res) {
        const boardUserId = req.params.id;
        if (!boardUserId) {
            res.status(400).send("id didn't send");
            return;
        }
        let findedBoardUser;
        try {
            findedBoardUser = await this.boardUserService.getBoardUserById(boardUserId);
        } catch (err) {
            res.status(500).send("Database error");
            return;
        }
        if (!findedBoardUser) {
            res.status(404).send(`board user with id ${boardUserId} doesn't exist`);
            return;
        }
        res.status(200).json(findedBoardUser);
    }

    async createBoardUser(req, res) {
        const boardUser = { boardId: req.body.boardId, userId: req.body.userId, role: req.body.role };
        let createdBoardUser;
        try {
            createdBoardUser = await this.boardUserService.createBoardUser(boardUser);
        } catch (err) {
            res.status(500).send("Database error");
            return;
        }
        if (!createdBoardUser) {
            res.status(400).send(`can't create task`);
            return;
        }
        res.status(201).json(createdBoardUser);
    }

    async updateBoardUser(req, res) {
        const boardUserId = req.body.id;
        if (!boardUserId) {
            res.status(404).send("task id does't sent");
            return;
        }
        const boardUser = { boardId: req.body.boardId, userId: req.body.userId, role: req.body.role };
        let updatedboardUser;
        try {
            updatedboardUser = await this.boardUserService.updateBoardUser(boardUserId, boardUser);
        } catch (err) {
            res.status(500).send("Database error");
            return;
        }
        if (!updatedboardUser) {
            res.status(404).send(`task with id ${boardUserId} does't exist`);
            return;
        }
        res.status(200).json(updatedboardUser);
    }

    async deleteBoardUser(req, res) {
        const id = req.params.boardUserId;
        if (!id) {
            res.status(404).send("id does't sent");
            return;
        }
        let isDeleted;
        try {
            isDeleted = await this.boardUserService.deleteBoardUser(id);
        } catch (err) {
            res.status(500).send("Database error");
            return;
        }
        if (!isDeleted) {
            res.status(404).send(`board user with id ${id} doesn't exist`);
            return;
        }
        res.status(200).send("board user deleted");
    }
}
