import express from "express";
import UserController from "../controller/userController.js";

export const userRouter = express.Router();
const parser = express.json();
const userController = new UserController();

userRouter.post("/login", parser, async (req, res) => {
    // sign in user
    await userController.loginUser(req, res);
});

userRouter.post("/register", parser, async (req, res) => {
    // sign up user
    await userController.createUser(req, res);
});

userRouter.get("/", async (req, res) => {
    // get users (maybe for searching to add to board)
    await userController.getUsers(req, res);
});

userRouter.get("/:id", async (req, res) => {
    // get user by id
    await userController.getUserById(req, res);
});

userRouter.put("/", parser, async (req, res) => {
    // edit user
    await userController.updateUser(req, res);
});
