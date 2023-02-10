import { Sequelize, DataTypes } from "sequelize";
import returnBoard from "./dbBoard.js";
import returnBoardUser from "./dbBoardUser.js";
import returnStatus from "./dbStatus.js";
import returnTask from "./dbTask.js";
import returnUser from "./dbUser.js";

export const sequelize = new Sequelize("rs-clone-db", "postgres", "1234", {
    dialect: "postgres",
    logging: true,
});
export const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = returnUser(sequelize, DataTypes);
db.board = returnBoard(sequelize, DataTypes);
db.boardUser = returnBoardUser(sequelize, DataTypes);

db.user.belongsToMany(db.board, { through: db.boardUser, onDelete: "CASCADE", onUpdate: "CASCADE" });
db.board.belongsToMany(db.user, { through: db.boardUser, onDelete: "CASCADE", onUpdate: "CASCADE" });

db.status = returnStatus(sequelize, DataTypes);
db.board.hasMany(db.status, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.task = returnTask(sequelize, DataTypes);
db.status.hasMany(db.task, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
