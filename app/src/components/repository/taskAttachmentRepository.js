import DbBaseRepository from "./baseRepository.js";

export default class TaskAttachmentRepository extends DbBaseRepository {
    constructor() {
        super();
        this.type = "taskAttachment";
    }
    async getTaskAttachments(filterOptions = {}, sortParamsArray = [], pageParams = {}) {
        return await super.getAll(filterOptions, sortParamsArray, pageParams);
    }

    async getTaskAttachmentById(attachmentId) {
        return await super.getById(attachmentId);
    }

    async createTaskAttachment(attachment) {
        return await super.create(attachment);
    }

    async updateAttachment(attachment) {
        return await super.update(attachment);
    }

    async deleteAttachment(attachmentId) {
        return await super.delete(attachmentId);
    }
}
