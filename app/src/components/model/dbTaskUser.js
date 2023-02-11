function returnTaskUser(sequelize, DataTypes) {
    const taskUser = sequelize.define("taskUsers", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
    });
    return taskUser;
}
export default returnTaskUser;
