function returnTask(sequelize, DataTypes) {
    const task = sequelize.define("tasks", {
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
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        markId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        done: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    });
    return task;
}
export default returnTask;
