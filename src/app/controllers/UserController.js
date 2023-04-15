import User from '../models/User';
import UserService from '../services/User/UserService';
import CRUDController from '../../crud/CRUDController';

const UserController = CRUDController(User, {
  resource: 'users'
});

export default UserController;
