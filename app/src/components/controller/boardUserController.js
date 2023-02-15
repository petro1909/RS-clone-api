import BoardUserRepository from "../repository/boardUserRepository.js";
import { getSortParamsArray } from "../service/queryParamsParser.js";

export default class boardUserController {
    boardUserRepository;
    constructor() {
        this.boardUserRepository = new BoardUserRepository();
    }

    async getBoardUsers(req, res) {
        const queryParams = req.query;
        const filterParams = { boardId: queryParams.boardId };
        const sortParamsArray = getSortParamsArray(queryParams);
        let boardUsers;
        try {
            boardUsers = await this.boardUserRepository.getBoardUsers(filterParams, sortParamsArray);
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
            findedBoardUser = await this.boardUserRepository.getBoardUserById(boardUserId);
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
        const boardUser = req.body;
        let createdBoardUser;
        try {
            createdBoardUser = await this.boardUserRepository.createBoardUser(boardUser);
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
        const boardUser = req.body;
        let updatedboardUser;
        try {
            updatedboardUser = await this.boardUserRepository.updateBoardUser(boardUser);
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
        const id = req.params.id;
        if (!id) {
            res.status(404).send("id does't sent");
            return;
        }
        let isDeleted;
        try {
            isDeleted = await this.boardUserRepository.deleteBoardUser(id);
        } catch (err) {
            res.status(500).send("Database error");
            return;
        }
        if (!isDeleted) {
            res.status(404).send(`board user with id ${id} doesn't exist`);
            return;
        }
        res.status(204).send("board user deleted");
    }
}
