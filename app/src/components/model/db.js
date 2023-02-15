import { Sequelize, DataTypes } from "sequelize";
import returnBoard from "./dbBoard.js";
import returnBoardMark from "./dbBoardMark.js";
import returnBoardUser from "./dbBoardUser.js";
import returnStatus from "./dbStatus.js";
import returnTask from "./dbTask.js";
import returnTaskAttachment from "./dbTaskAttachment.js";
import returnTaskMark from "./dbTaskMark.js";
import returnTaskUser from "./dbTaskUser.js";
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
db.boardMark = returnBoardMark(sequelize, DataTypes);

db.board.hasMany(db.boardMark, { onDelete: "CASCADE", onUpdate: "CASCADE" });

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

db.taskAttachment = returnTaskAttachment(sequelize, DataTypes);
db.task.hasMany(db.taskAttachment, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.taskUser = returnTaskUser(sequelize, DataTypes);

db.task.belongsToMany(db.boardUser, { through: db.taskUser, onDelete: "CASCADE", onUpdate: "CASCADE" });
db.boardUser.belongsToMany(db.task, { through: db.taskUser, onDelete: "CASCADE", onUpdate: "CASCADE" });

db.taskMark = returnTaskMark(sequelize, DataTypes);

db.task.belongsToMany(db.boardMark, { through: db.taskMark, onDelete: "CASCADE", onUpdate: "CASCADE" });
db.boardMark.belongsToMany(db.task, { through: db.taskMark, onDelete: "CASCADE", onUpdate: "CASCADE" });
