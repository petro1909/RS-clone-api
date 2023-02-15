import express from "express";
import AdminController from "../controller/adminController.js";

export const adminRouter = express.Router();
const parser = express.json();
const adminController = new AdminController();

adminRouter.post("/login", async (req, res) => {
    // sign in admin
    await adminController.loginUser(req, res);
});
adminRouter.post("/register", parser, async (req, res) => {
    // sign up admin
    await adminController.createUser(req, res);
});

adminRouter.get("/users", async (req, res) => {
    // get users by any params
    await adminController.getUsers(req, res);
});
adminRouter.get("/users/:id", async (req, res) => {
    // get users by any params
    await adminController.getUsers(req, res);
});
adminRouter.post("/users", async (req, res) => {
    // create user
    await adminController.getUsers(req, res);
});
adminRouter.put("/users", async (req, res) => {
    // update user
    await adminController.getUsers(req, res);
});
adminRouter.delete("/users/:id", async (req, res) => {
    // delete user
    await adminController.deleteUser(req, res);
});

adminRouter.get("/statistics", async (req, res) => {
    // get users queries statistic
    await adminController.getUsers(req, res);
});
adminRouter.get("/statistics/:id", async (req, res) => {
    // get users queries statistic
    await adminController.getUsers(req, res);
});
adminRouter.post("/statistics", async (req, res) => {
    // post user statistics
    await adminController.getUsers(req, res);
});
adminRouter.put("/statistics", async (req, res) => {
    // post user statistics
    await adminController.getUsers(req, res);
});
adminRouter.delete("/statistics/:id", async (req, res) => {
    // delete user statistics
    await adminController.getUsers(req, res);
});
