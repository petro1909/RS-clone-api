import express from 'express';
import AccountController from '../controller/adminController.js';


export const accountRouter = express.Router();
const parser = express.json();
const accountController = new AccountController();

accountRouter.post("/login", parser, async (req, res) => {
  await accountController.login(req, res);
});

accountRouter.post("/logout", parser, async (req, res) => {
  await accountController.logout(req, res);
});

accountRouter.post("/register", parser, async (req, res) => {
  await accountController.registration(req, res);
});

