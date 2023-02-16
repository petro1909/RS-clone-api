import express from "express";
import AdminController from "../controller/adminController.js";
import UserController from "../controller/userController.js";
import { verifyRequiredRole, verifyUser } from "../middleware/authService.js";

export const adminRouter = express.Router();
const parser = express.json();
const adminController = new AdminController();
const userController = new UserController();

adminRouter.get("/users", verifyUser, verifyRequiredRole("ADMIN"), async (req, res) => {
    // get users by any params
    await userController.getUsers(req, res);
});
adminRouter.get("/users/:id", verifyUser, verifyRequiredRole("ADMIN"), async (req, res) => {
    // get users by any params
    await userController.getUserById(req, res);
});
adminRouter.post("/users", verifyUser, verifyRequiredRole("ADMIN"), parser, async (req, res) => {
    // create user
    await userController.registerUser(req, res);
});
adminRouter.put("/users", verifyUser, verifyRequiredRole("ADMIN"), parser, async (req, res) => {
    // update user
    await adminController.updateUser(req, res);
});
adminRouter.delete("/users/:id", verifyUser, verifyRequiredRole("ADMIN"), async (req, res) => {
    // delete user
    await adminController.deleteUser(req, res);
});

adminRouter.get("/statistics", verifyUser, verifyRequiredRole("ADMIN"), async (req, res) => {
    // get users queries statistic
    await adminController.getUsers(req, res);
});
adminRouter.get("/statistics/:id", verifyUser, verifyRequiredRole("ADMIN"), async (req, res) => {
    // get users queries statistic
    await adminController.getUsers(req, res);
});
adminRouter.post("/statistics", verifyUser, verifyRequiredRole("ADMIN"), async (req, res) => {
    // post user statistics
    await adminController.getUsers(req, res);
});
adminRouter.put("/statistics", verifyUser, verifyRequiredRole("ADMIN"), async (req, res) => {
    // post user statistics
    await adminController.getUsers(req, res);
});
adminRouter.delete("/statistics/:id", verifyUser, verifyRequiredRole("ADMIN"), async (req, res) => {
    // delete user statistics
    await adminController.getUsers(req, res);
});
