import Menu from '../models/Menu';
import CRUDController from '../../crud/CRUDController';

const MenuController = CRUDController(Menu, {
  resource: 'cardapios',
});

export default MenuController;
