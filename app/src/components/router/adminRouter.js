import express from "express";
import AdminController from "../controller/adminController.js";
import UserController from "../controller/userController.js";
import { verifyRequiredRole, verifyUser } from "../middleware/authService.js";

export const adminRouter = express.Router();
export default { route: "administration", router: adminRouter };

const parser = express.json();
const adminController = new AdminController();
const userController = new UserController();

adminRouter.get("/users", verifyUser, verifyRequiredRole(["ADMIN", "SUPERADMIN"]), async (req, res) => {
    // get users by any params
    await userController.getUsers(req, res);
});
adminRouter.get("/users/:id", verifyUser, verifyRequiredRole(["ADMIN", "SUPERADMIN"]), async (req, res) => {
    // get users by any params
    await userController.getUserById(req, res);
});
adminRouter.post("/users", verifyUser, verifyRequiredRole(["ADMIN", "SUPERADMIN"]), parser, async (req, res) => {
    // create user
    await userController.registerUser(req, res);
});
adminRouter.put("/users", verifyUser, verifyRequiredRole(["ADMIN", "SUPERADMIN"]), parser, async (req, res) => {
    // update user
    await adminController.updateUser(req, res);
});
adminRouter.delete("/users/:id", verifyUser, verifyRequiredRole(["ADMIN", "SUPERADMIN"]), async (req, res) => {
    // delete user
    await adminController.deleteUser(req, res);
});

adminRouter.get("/statistics", verifyUser, verifyRequiredRole(["ADMIN", "SUPERADMIN"]), async (req, res) => {
    // get users queries statistics
    await adminController.getStatistics(req, res);
});
adminRouter.get("/statistics/:id", verifyUser, verifyRequiredRole(["ADMIN", "SUPERADMIN"]), async (req, res) => {
    // get users queries statistic by id
    await adminController.getStatisticById(req, res);
});
adminRouter.delete("/statistics/:id", verifyUser, verifyRequiredRole(["ADMIN", "SUPERADMIN"]), async (req, res) => {
    // delete user statistics
    await adminController.deleteStatistic(req, res);
});
