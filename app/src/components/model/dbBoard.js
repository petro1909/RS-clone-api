function returnBoard(sequelize, DataTypes) {
  const board = sequelize.define("boards", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    }, 
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return board;
}
export default returnBoard;