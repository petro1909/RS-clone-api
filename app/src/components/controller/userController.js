import { getFilterParams, getPageParams, getSortParamsArray } from "../util/queryParamsParser.js";
import UserService from "../service/userService.js";
export default class UserController {
  userService;
  constructor() {
    this.userService = new UserService();
  }

  async getUsers(req, res) {
      const queryParams = req.query;
      const filterParams = getFilterParams(queryParams);
      const sortParamsArray = getSortParamsArray(queryParams);
      const pageParams = getPageParams(queryParams);
      let users
      try {
        users = await this.userService.getUsers(filterParams, sortParamsArray, pageParams);
      } catch(err) {
        res.status(500).send("Database error");
        return;
      }
      if(!users) {
        res.status(500).send("Server can't get users");
        return;
      }
      res.status(200).json(users);
  }

  async getUserById(req, res) {
    const id = req.params.id;
    if(!id) {
      res.status(400).send("id didn't sent");
      return;
    }
    let findedUser;
    try {
      findedUser = await this.userService.getUser(id);
    } catch(err) {
      res.status(500).send("Database error");
      return;
    }
    if(!findedUser) {
      res.status(404).send(`user with id ${id} does't exist`);
      return;
    }
    res.status(200).json(findedUser);
  }

  async loginUser(req, res) {
    const email = req.body.email;
    if(!email) {
      res.status(400).send("email can not be empty");
      return;
    }
    const password = req.body.password;
    if(!password) {
      res.status(400).send("password can not be empty");
      return;
    }
    let findedUser;
    try {
      findedUser = await this.userService.getUserByLoginAndPassword(email, password);
    } catch(err) {
      res.status(500).send("Database error");
      return;
    }
    if(!findedUser) {
      res.status(404).send(`login or password not correct`);
      return;
    }
    res.status(200).json(findedUser);
  }

  async createUser(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    if(!email) {
      res.status(400).send("email can not be empty");
      return;
    }
    const password = req.body.password;
    if(!password) {
      res.status(400).send("password can not be empty");
      return;
    }
    let createdUser;
    try {
      createdUser = await this.userService.createUser(name, email, password);
    } catch(err) {
      res.status(500).send("Database error");
      return;
    }
    if(!createdUser) {
      res.status(400).send(`user with email ${email} already exist`);
      return;
    }
    res.status(200).json(createdUser);
  }

  async updateUser(req, res) {
    const userId = req.body.id; 
    if(!userId) {
      res.status(404).send("id does't sent");
      return;
    }
    const user = { name: req.body.name, email: req.body.email, password: req.body.password };
    let updatedUser;
    try {
      updatedUser = await this.userService.updateUser(userId, user);
    } catch(err) {
      res.status(500).send("Database error");
      return;
    }
    if(!updatedUser) {
      res.status(404).send(`user with id ${req.body.id} does't exist`);
      return;
    }
    res.status(200).json(updatedUser);
  }

  async deleteUser(req, res) {
    const id = req.params.id;
    if(!id) {
      res.status(404).send("id does't sent");
      return;
    }
    let isDeleted;
    try {
      isDeleted = await this.userService.deleteUser(id);
    } catch(err) {
      res.status(500).send("Database error");
      return;
    }
    if(!isDeleted) {
      res.status(404).send(`user with id ${id} does't exist`);
      return;
    }
    res.status(200).send("user deleted");
  }
}