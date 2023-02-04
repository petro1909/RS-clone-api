import { db } from "../model/db";
import TaskService from "./taskService";

export default class BoardStatusService {
  constructor() {
    this.taskService = new TaskService();
  }
  async getAllBoardStatuses(searchOptions) {
    let statuses;
    if(!searchOptions) {
      statuses = await db.status.findAll();
    } else {
      statuses = await db.status.findAll({where: searchOptions});
    }
    return statuses;
  }
  async getStatusById(statusId) {
    const findedStatus = await db.status.findByPk(statusId);
    return findedStatus;
  }
  async createStatus(status) {
    const createdStatus = await db.status.create(status);
    return createdStatus;
  }
  async updateStatus(statusId, status) {
    await db.status.update(status, { where: { id: statusId } });
  }
  async deleteStatus(statusId) {
    await db.status.destroy({ where: { id: statusId } });
  }
}