import express from 'express';
import UserController from '../controller/userController.js';

export const userRouter = express.Router();
const parser = express.json();
const userController = new UserController();

userRouter.get("/", async (req, res) => {
  await userController.getUsers(req, res);
});

userRouter.get("/:id", async (req, res) => {
  await userController.getUserById(req, res);
});

userRouter.post("/login", async (req, res) => {
  await userController.loginUser(req, res);
});

userRouter.post("/register", async (req, res) => {
  await userController.createUser(req, res);
});

userRouter.post("/", parser, async (req, res) => {
  await userController.createUser(req, res);  
});

userRouter.put("/", parser, async (req, res) => {
  await userController.updateUser(req, res);
});

userRouter.delete("/:id", async (req, res) => {
  await userController.deleteUser(req, res);
});