import { db } from "./components/model/db.js";
import cors from "cors";
import express from "express";
import { userRouter } from "./components/router/userRouter.js";
import { userBoardRouter } from "./components/router/userBoardRouter.js";
import { boardUserRouter } from "./components/router/boardUserRouter.js";
import { adminRouter } from "./components/router/adminRouter.js";
import { boardStatusRouter } from "./components/router/boardStatusRouter.js";
import { boardTaskRouter } from "./components/router/boardTaskRouter.js";

export const app = express();
app.use(cors());
app.use("/administration", adminRouter);
app.use("/users", userRouter);
app.use("/userBoards", userBoardRouter);
app.use("/boardUsers", boardUserRouter);
app.use("/boardStatus", boardStatusRouter);
app.use("/boardTasks", boardTaskRouter);

try {
    await db.sequelize.sync({ force: true });
} catch (err) {
    console.error(err.name);
}

app.listen(3000, () => {
    console.log("server is started on port 3000");
});
