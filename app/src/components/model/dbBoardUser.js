function returnBoardUser(sequelize, DataTypes) {
    const boardUser = sequelize.define("boardUsers", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        role: {
            type: DataTypes.ENUM,
            values: ["ADMIN", "VIEWER", "PARTICIPANT"],
        },
    });
    return boardUser;
}
export default returnBoardUser;
