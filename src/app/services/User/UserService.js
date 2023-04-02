import User from '@/app/models/User';

class UserService {
  async create(data) {
    return User.create(data);
  }
}

export default new UserService();
