import { db } from "../model/db";

export default class BoardUserService {

  async getBoardUsers(filterOptions, sortParamsArray, pageParams) {
    let boardUsers;
    try {
      boardUsers = await db.boardUser.findAll({ where: filterOptions, order: sortParamsArray,  offset: pageParams.offset, limit: pageParams.limit});
    } catch(err) {
      throw new Error(err);
    }
    return boardUsers;
  }

  async getBoardUserById(boardUserId) {
    let boardUser;
    try {
      boardUser = await db.boardUser.findByPk(boardUserId);
    } catch(err) {
      throw new Error(err);
    }
    return boardUser;
  }

  async createBoardUser(boardUser) {
    let createdBoardUser;
    try {
      createdBoardUser = await db.boardUser.create(boardUser);
    } catch(err) {
      throw new Error(err);
    }
    return createdBoardUser;
  }

  async updateBoardUser(boardUserId, boardUser) {
    let updatedBoardUser;
    try {
      updatedBoardUser = await db.boardUser.update(boardUser, { where: { id: boardUserId } });
    } catch(err) {
      throw new Error(err);
    }
    return updatedBoardUser;
  }

  async deleteBoard(boardUserId) {
    let isDeleted;
    try {
      isDeleted = await db.boardUser.destroy({where: {id: boardUserId}}); 
    } catch(err) {
      throw new Error(err);
    }
    return isDeleted;
  }
}