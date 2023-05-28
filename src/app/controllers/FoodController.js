import Food from '../models/Food';
import CRUDController from '../../crud/CRUDController';

const FoodController = CRUDController(Food, {
  resource: 'foods',
  order: 'name',
  orderType: 'ASC',
});

export default FoodController;
