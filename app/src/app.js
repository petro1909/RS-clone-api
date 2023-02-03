import {db} from "./components/model/db.js";
import cors from "cors";
import express from 'express';
import { userRouter } from "./components/router/userRouter.js";
import { userBoardRouter } from "./components/router/userBoardRouter.js";

export const app = express();
app.use(cors());
app.use('/users', userRouter);
app.use('/userBoards', userBoardRouter);
try {
  await db.sequelize.sync({force: true});
} catch(err) {
  console.error(err.name);
}

app.listen(3000, () => {
  console.log("server is started on port 3000");
});
