import UserService from "../service/userService.js";
export default class UserController {
  userService;
  constructor() {
    this.userService = new UserService();
  }
  async getUsers(req, res) {
      const users = await userService.getUsers();
      res.status(200).json(users);
  }
  async getUserById(req, res) {
    const id = req.params.id;
    if(!id) {
      res.status(404).send("id does't sent");
    }
    const findedUser = await this.userService.getUser(id);
    if(!findedUser) {
      res.status(404).send(`user with id ${id} does't exist`);
      return;
    }
    res.status(200).json(findedUser);
  }
  async createUser(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const createdUser = await this.userService.createUser(name, email, password);
    if(!createdUser) {
      res.status(400).send(`user with email ${email} already exist`);
    }
    res.status(200).json(createdUser);
  }
  async updateUser(req, res) {
    const id = req.body.id; 
    if(!id) {
      res.status(404).send("id does't sent");
    }
    const user = { name: req.body.name, email: req.body.email, password: req.body.password };
    const updateUser = await userService.updateUser(id, user);
    if(!updateUser) {
      res.status(404).send(`user with id ${req.body.id} does't exist`);
    }
    res.status(200).json(updateUser);
  }
  async deleteUser(req, res) {
    const id = req.params.id;
    if(!id) {
      res.status(404).send("id does't sent");
    }
    const deletedUser = await userService.deleteUser(id);
    if(!deletedUser) {
      res.status(404).send(`user with id ${id} does't exist`);
      return;
    }
    res.status(200);
  }
}