function returnBoard(sequelize, DataTypes) {
  const board = sequelize.define("boards", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
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