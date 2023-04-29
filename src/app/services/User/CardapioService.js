import Cardapio from "@/app/models/Cardapio";

class CardapioService {
    async create(data) {
        return Cardapio.create(data);
    }
}

export default new CardapioService();