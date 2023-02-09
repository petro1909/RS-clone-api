import { db } from "../model/db.js";

export default class BoardService {
    async getBoards(filterOptions = {}, sortParamsArray = [], pageParams = {}) {
        let boards;
        try {
            boards = await db.board.findAll({ where: filterOptions, order: sortParamsArray, offset: pageParams.offset, limit: pageParams.limit });
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
        return boards;
    }

    async getUserBoards(userId) {
        let userBoardsPromises = [];
        let userBoards = [];
        try {
            const boardUsers = await db.boardUser.findAll({ where: { userId: userId } });
            userBoardsPromises = boardUsers.map((boardUser) => db.board.findByPk(boardUser.boardId));
            userBoards = await Promise.all(userBoardsPromises);
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
        return userBoards;
    }

    async getBoardById(boardId) {
        let board;
        try {
            board = await db.board.findByPk(boardId);
        } catch (err) {
            throw new Error(err);
        }
        return board;
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

    async updateBoard(boardId, board) {
        let updatedBoardResult;
        try {
            updatedBoardResult = await db.board.update(board, { where: { id: boardId }, returning: true, plain: true });
        } catch (err) {
            throw new Error(err);
        }
        const updatedBoard = updatedBoardResult[1].dataValues;
        return updatedBoard;
    }

    async deleteBoard(boardId) {
        let isDeleted;
        try {
            isDeleted = await db.board.destroy({ where: { id: boardId } });
        } catch (err) {
            throw new Error(err);
        }
        return isDeleted;
    }
}
