import {db} from "./model/db.js";
await db.sequelize.sync({force: true});
await db.user.create({
  name: "Tom",
  email: "email",
  password: "password",
});
