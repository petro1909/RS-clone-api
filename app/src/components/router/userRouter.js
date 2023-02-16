import express from "express";
import UserController from "../controller/userController.js";
import UserPictureController from "../controller/userPictureController.js";
import { verifyUser } from "../middleware/authService.js";

export const userRouter = express.Router();
const parser = express.json();

const userController = new UserController();
const userPictureController = new UserPictureController();

userRouter.post("/login", parser, async (req, res) => {
    // sign in user
    await userController.loginUser(req, res);
});

userRouter.post("/register", parser, async (req, res) => {
    // sign up user
    await userController.registerUser(req, res);
});

userRouter.get("/", verifyUser, async (req, res) => {
    // get users (maybe for searching to add to board)
    await userController.getUsers(req, res);
});

userRouter.get("/:id", verifyUser, async (req, res) => {
    // get user by id
    await userController.getUserById(req, res);
});

userRouter.put("/", verifyUser, parser, async (req, res) => {
    // edit user
    await userController.updateUser(req, res);
});

userRouter.get("/:id/profilePicture", verifyUser, async (req, res) => {
    await userPictureController.getUserProfilePicture(req, res);
});

userRouter.post("/:id/profilePicture", verifyUser, async (req, res) => {
    await userPictureController.uploadUserProfilePicture(req, res);
});

userRouter.delete("/:id/profilePicture", verifyUser, async (req, res) => {
    await userPictureController.deleteUserProfilePicture(req, res);
});
