function returnBoardMark(sequelize, DataTypes) {
    const boardMark = sequelize.define("boardMarks", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
    return boardMark;
}
export default returnBoardMark;
