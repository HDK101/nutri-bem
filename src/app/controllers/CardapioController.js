import Cardapio from '../models/Cardapio';
import CardapioService from '../services/User/CardapioService';
import CRUDController from '../../crud/CRUDController';

const CardapioController = CRUDController(Cardapio, {
  resource: 'cardapios'
});

export default CardapioController;
