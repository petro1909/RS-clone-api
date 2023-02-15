function returnTaskMark(sequelize, DataTypes) {
    const taskMark = sequelize.define("taskMarks", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
    });
    return taskMark;
}
export default returnTaskMark;
