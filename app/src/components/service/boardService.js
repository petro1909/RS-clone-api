import { db } from "../model/db";

export default class BoardService {
    async getBoards(filterOptions, sortParamsArray, pageParams) {
        let boards;
        try {
            boards = await db.board.findAll({ where: filterOptions, order: sortParamsArray, offset: pageParams.offset, limit: pageParams.limit });
        } catch (err) {
            throw new Error(err);
        }
        return boards;
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
            throw new Error(err);
        }
        return createdBoard;
    }

    async updateBoard(boardId, board) {
        let updatedBoard;
        try {
            updatedBoard = await db.board.update(board, { where: { id: boardId } });
        } catch (err) {
            throw new Error(err);
        }
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
