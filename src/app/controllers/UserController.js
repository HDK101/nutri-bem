import User from '../models/User';
import CRUDController from '../../crud/CRUDController';

const UserController = CRUDController(User, {
  resource: 'users',
  order: 'name',
  orderType: 'ASC',
});

export default UserController;
