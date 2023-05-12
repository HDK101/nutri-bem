import { Op } from "sequelize";
import Menu from "../models/Menu";
import Food from "../models/Food";
import MenuFood from "../models/MenuFood";

const MenuFoodController = {
  async index(ctx) {
    const menuId = +ctx.params.menuId;
    const menu = await Menu.findByPk(menuId, {
      include: Food,
    });

    const foodIds = menu.Food.map((r) => r.id);
    const foods = await Food.findAll({
      where: {
        id: {
          [Op.notIn]: foodIds,
        },
      },
    });

    return ctx.view('resources/menus/foods', {
      menu,
      foods,
      currentFoods: menu.Food,
    });
  },

  async store(ctx) {
    const menuId = +ctx.params.menuId;
    const foodId = +ctx.params.foodId;

    await MenuFood.create({
      menu_id: menuId,
      food_id: foodId,
    });

    ctx.redirect(`/menus/${menuId}/foods`);
  },

  async destroy(ctx) {
    const menuId = +ctx.params.menuId;
    const foodId = +ctx.params.foodId;

    await MenuFood.destroy({
      where: {
        menu_id: menuId,
        food_id: foodId,
      },
    });

    ctx.redirect(`/menus/${menuId}/foods`);
  },
};

export default MenuFoodController;
