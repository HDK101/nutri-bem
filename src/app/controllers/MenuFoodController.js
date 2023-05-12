import { Op } from 'sequelize';
import Menu from '../models/Menu';
import Food from '../models/Food';
import MenuFood from '../models/MenuFood';

const MenuFoodController = {
  async index(ctx) {
    const menuId = +ctx.params.menuId;
    const menu = await Menu.findByPk(menuId, {
      include: Food,
    });

    const foodIds = Menu.Foods.map((r) => r.id);
    const foods = await Food.findAll({
      where: {
        id: {
          [Op.notIn]: foodIds,
        },
      },
    });

    return ctx.view('resources/menus/associate', {
      menu,
      foods,
      currentFoods: menu.Foods,
    });
  },

  async store(ctx) {
    const menuId = +ctx.params.menuId;
    const restrictionId = +ctx.params.restrictionId;

    await MenuFood.create({
      menu_id: menuId,
      restriction_id: restrictionId,
    });

    ctx.redirect(`/menus/${menuId}/foods`);
  },

  async destroy(ctx) {
    const menuId = +ctx.params.menuId;
    const restrictionId = +ctx.params.restrictionId;

    await MenuFood.destroy({
      where: {
        menu_id: menuId,
        restriction_id: restrictionId,
      },
    });

    ctx.redirect(`/menus/${menuId}/foods`);
  },
};

export default MenuFoodController;
