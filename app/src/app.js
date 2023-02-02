import {db} from "./model/db.js";
import cors from "cors";
import express from 'express';
import { userRouter } from "./router/userRouter.js";

export const app = express();
app.use(cors());
app.use('/users', userRouter);

await db.sequelize.sync({forse: true});
app.listen(3000, () => {
  console.log("server is started on port 3000");
});
