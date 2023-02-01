function returnStatus(sequelize, DataTypes) {
  const status = sequelize.define("statuses", {
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
  return status;
}
export default returnStatus;