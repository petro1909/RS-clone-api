import { db } from "../model/db.js";

export default class UserService {
    async getUsers() {
      return await db.user.findAll();
    }
    async getUser(id) {
      const user = await db.user.findByPk(id);
      return user;
    }

    getUserByLoginAndPassword() {

    }
    async createUser(name, email, password, role = "USER") {
        //cash password
        const user = { name: name, email: email, password: password, role: role };
        const createdUser = await db.user.create(user);
        return createdUser;
    }
    async updateUser(id, user) {
        const updateUser = await db.user.update(user, {where: {id: id}});
        console.log(updateUser);
        return updateUser;
    }

    async deleteUser(id) {
      const deletedUser = await db.user.destroy({where: {id: id}});
      return deletedUser;
    }
}