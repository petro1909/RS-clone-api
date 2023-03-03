import fs from "fs/promises";
import path from "path";
import { Sequelize } from "sequelize";
import connectionString from "./config/config.js";

export const db = {};
const modelFilesFolderPath = path.join("./src/components/database/models");
const modelFilesFolder = "models";
const sequelize = new Sequelize(connectionString, { logging: console.log });

let dbFiles = await fs.readdir(modelFilesFolderPath);
dbFiles = dbFiles.filter((file) => file.indexOf(".") !== 0 && file.slice(-3) === ".js" && file.indexOf(".test.js") === -1);
dbFiles = dbFiles.map((file) => import(`./${modelFilesFolder}/${file}`));
dbFiles = await Promise.all(dbFiles);

dbFiles.forEach(async (entityFunction) => {
    const model = entityFunction.default(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
});
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;
