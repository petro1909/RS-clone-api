import path from "path";
import { db } from "./components/model/db.js";
import cors from "cors";
import express from "express";
import { userRouter } from "./components/router/userRouter.js";
import { userBoardRouter } from "./components/router/userBoardRouter.js";
import { boardUserRouter } from "./components/router/boardUserRouter.js";
import { adminRouter } from "./components/router/adminRouter.js";
import { boardStatusRouter } from "./components/router/boardStatusRouter.js";
import { boardTaskRouter } from "./components/router/boardTaskRouter.js";
import fileUpload from "express-fileupload";
import { boardMarkRouter } from "./components/router/boardMarkRouter.js";
import { taskUserRouter } from "./components/router/taskUserRouter.js";
import { taskMarkRouter } from "./components/router/taskMarkRouter.js";
// import { RequestLoggerService } from "./components/middleware/requestLoggerService.js";

// const logger = new RequestLoggerService();
export const staticFilesFolder = path.resolve(process.cwd(), "./src/static");
export const app = express();
app.use(cors());
app.use(fileUpload());
// app.use(logger.makeLog);
app.use(express.static(staticFilesFolder));
app.use("/administration", adminRouter);
app.use("/users", userRouter);
app.use("/boards", userBoardRouter);
app.use("/boardUsers", boardUserRouter);
app.use("/boardMarks", boardMarkRouter);
app.use("/statuses", boardStatusRouter);
app.use("/tasks", boardTaskRouter);
app.use("/taskUsers", taskUserRouter);
app.use("/taskMarks", taskMarkRouter);

try {
    await db.sequelize.sync({ force: false });
} catch (err) {
    console.error(err);
}
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server is started at port ${port}`);
});
