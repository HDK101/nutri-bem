import User from '../models/User';
import CRUDController from '../../crud/CRUDController';

const UserController = CRUDController(User, {
  resource: 'users',
});

export default UserController;
