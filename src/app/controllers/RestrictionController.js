import CRUDController from '../../crud/CRUDController';
import Restriction from '../models/Restriction';

const MenuController = CRUDController(Restriction, {
  resource: 'restrictions',
});

export default RestrictionController;
