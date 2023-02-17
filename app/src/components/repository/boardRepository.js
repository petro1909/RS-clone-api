import { db } from "../model/db.js";
import DbBaseRepository from "./baseRepository.js";

export default class BoardRepository extends DbBaseRepository {
    constructor() {
        super();
        this.type = "board";
    }

    async getBoards(filterOptions = {}, sortParamsArray = [], pageParams = {}) {
        return await super.getAll(filterOptions, sortParamsArray, pageParams);
    }

    async getUserBoards(filterParams = {}, sortParamsArray = [], pageParams = {}) {
        let userBoardsPromises = [];
        let userBoards = [];
        try {
            const boardUsers = await db.boardUser.findAll({ where: filterParams, order: sortParamsArray, offset: pageParams.offset, limit: pageParams.limit });
            userBoardsPromises = boardUsers.map((boardUser) => db.board.findByPk(boardUser.boardId));
            userBoards = await Promise.all(userBoardsPromises);
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
        return userBoards;
    }

    async getBoardById(boardId) {
        return await super.getById(boardId);
    }

    async createBoard(board, userId) {
        let createdBoard;
        try {
            createdBoard = await db.board.create(board);
            if (userId) {
                const boardUser = {
                    boardId: createdBoard.id,
                    userId: userId,
                    role: "ADMIN",
                };
                await db.boardUser.create(boardUser);
            }
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
        return createdBoard;
    }

    async updateBoard(board) {
        return await super.update(board);
    }

    async deleteBoard(boardId) {
        return await super.delete(boardId);
    }
}
