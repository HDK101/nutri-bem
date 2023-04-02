import UserService from '../services/User/UserService';

class UserController {
  static async store(ctx) {
    ctx.body = await UserService.create(ctx.request.body);
  }
}

export default UserController;
