import Menu from '../models/Menu';
import CRUDController from '../../crud/CRUDController';

const MenuController = CRUDController(Menu, {
  resource: 'menus',
  include: 'patient',
});

export default MenuController;
