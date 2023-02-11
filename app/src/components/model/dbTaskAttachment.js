function returnTaskAttachment(sequelize, DataTypes) {
    const taskAttachment = sequelize.define("tasksAttachments", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM,
            values: ["FILE", "HYPERLINK"],
            allowNull: true,
        },
    });
    return taskAttachment;
}
export default returnTaskAttachment;
