function returnStatus(sequelize, DataTypes) {
    const status = sequelize.define("statuses", {
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
        order: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    return status;
}
export default returnStatus;
