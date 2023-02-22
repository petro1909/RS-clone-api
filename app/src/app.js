import path from "path";
import { db } from "./components/database/index.js";
import cors from "cors";
import express from "express";
import fs from "fs/promises";
import fileUpload from "express-fileupload";
import { RequestLoggerService } from "./components/middleware/requestLoggerService.js";

export const routers = new Map();
const logger = new RequestLoggerService();
export const staticFilesFolder = path.resolve(process.cwd(), "./src/static");
export const app = express();
app.use(cors());
app.use(fileUpload());
app.use(logger.makeLog);
app.use(express.static(staticFilesFolder));

const routerFilesFolderPath = path.resolve(process.cwd(), "./src/components/router");
const routerFilesFolder = "components/router";

async function mapRouter() {
    let routerFiles = await fs.readdir(routerFilesFolderPath);
    routerFiles = routerFiles.filter((file) => file.indexOf(".") !== 0 && file.slice(-3) === ".js" && file.indexOf(".test.js") === -1);
    routerFiles = routerFiles.map((file) => import(`./${routerFilesFolder}/${file}`));
    routerFiles = await Promise.all(routerFiles);
    routerFiles.forEach((routeFile) => {
        const routeEntity = routeFile.default;
        app.use(`/${routeEntity.route}`, routeEntity.router);
    });
}
mapRouter();

try {
    await db.sequelize.sync({ force: false });
} catch (err) {
    console.error(err);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("server is started on port 3000");
});
