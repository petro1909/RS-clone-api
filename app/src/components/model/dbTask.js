function returnTask(sequelize, DataTypes) {
  const task = sequelize.define("tasks", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    }, 
    text: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return task;
}
export default returnTask;