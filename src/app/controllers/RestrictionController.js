import CRUDController from '../../crud/CRUDController';
import Restriction from '../models/Restriction';

const RestrictionController = CRUDController(Restriction, {
  resource: 'restrictions',
});

export default RestrictionController;
