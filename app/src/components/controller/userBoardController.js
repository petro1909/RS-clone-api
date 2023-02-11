import BoardService from "../service/boardService.js";

export default class BoardController {
    userBoardService;
    constructor() {
        this.userBoardService = new BoardService();
    }

    async getUserBoards(req, res) {
        const userId = req.user.id;
        let userBoards;
        try {
            userBoards = await this.userBoardService.getUserBoards(userId);
        } catch (err) {
            res.status(500).send("Database error");
            return;
        }
        if (!userBoards) {
            res.status(500).send("Server can't get user boards");
            return;
        }
        res.status(200).json(userBoards);
    }

    async getUserBoardById(req, res) {
        const id = req.params.id;
        if (!id) {
            res.status(400).send("id didn't send");
            return;
        }
        let findedUserBoard;
        try {
            findedUserBoard = await this.userBoardService.getBoardById(id);
        } catch (err) {
            res.status(500).send("Database error");
            return;
        }
        if (!findedUserBoard) {
            res.status(404).send(`userBoard with id ${id} doesn't exist`);
            return;
        }
        res.status(200).json(findedUserBoard);
    }

    async createUserBoard(req, res) {
        const name = req.body.name;
        const userId = req.user.id;

        let createdUserBoard;
        try {
            const board = { name: name };
            createdUserBoard = await this.userBoardService.createBoard(board, userId);
        } catch (err) {
            res.status(500).send("Database error");
            return;
        }
        if (!createdUserBoard) {
            res.status(400).send(`can't create user board`);
            return;
        }
        res.status(201).json(createdUserBoard);
    }

    async updateUserBoard(req, res) {
        const boardId = req.body.id;
        if (!boardId) {
            res.status(404).send("id does't sent");
            return;
        }
        const userBoard = { name: req.body.name };
        let updatedUserBoard;
        try {
            updatedUserBoard = await this.userBoardService.updateBoard(boardId, userBoard);
        } catch (err) {
            res.status(500).send("Database error");
            return;
        }
        if (!updatedUserBoard) {
            res.status(404).send(`user board with id ${boardId} does't exist`);
            return;
        }
        res.status(200).json(updatedUserBoard);
    }

    async deleteUserBoard(req, res) {
        const id = req.params.id;
        if (!id) {
            res.status(404).send("id does't sent");
            return;
        }
        let isDeleted;
        try {
            isDeleted = await this.userBoardService.deleteBoard(id);
        } catch (err) {
            res.status(500).send("Database error");
            return;
        }
        if (!isDeleted) {
            res.status(404).send(`board with id ${id} doesn't exist`);
            return;
        }
        res.status(204).send("user board deleted");
    }
}
