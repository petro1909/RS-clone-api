function returnRequestLog(sequelize, DataTypes) {
    const requestLog = sequelize.define("requestLogs", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        logDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        method: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        os: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        browser: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return requestLog;
}
export default returnRequestLog;
