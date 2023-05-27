import { Op } from "sequelize";
import Menu from "../models/Menu";
import Food from "../models/Food";
import QueryTypes from "sequelize";
import {connection} from "@/database";

import MenuFood from "../models/MenuFood";
import Restriction from "../models/Restriction";

const MenuFoodController = {
  async index(ctx) {
    const menuId = +ctx.params.menuId;
    const menu = await Menu.findByPk(menuId, {
      include: [Food, 'patient'],
    });

    const patient = menu.patient?.[0];
    const restrictions = await patient.getRestrictions();
    const restrictionIds = restrictions.map(restriction => restriction.id).join(',');
    const currentFoods = menu.Food.map((r) => ({ id: r.id, name: r.name, amount: r.MenuFood.amount }));
    const foodIds = currentFoods.map(food => food.id).join(',');
    console.log(foodIds);

    const toSelectFoods = await connection.query('SELECT f.id as id, f.name as name, f.createdAt as createdAt, f.updatedAt as updatedAt FROM Food f FULL JOIN FoodRestrictions fr ON f.id = fr.food_id WHERE fr.restriction_id IS NULL OR fr.restriction_id NOT IN (:restrictionIds) AND f.id NOT IN(:foodIds)', {
      replacements: {
        restrictionIds,
        foodIds,
      },
      model: Food,
      mapToModel: true,
      type: QueryTypes.SELECT,
    });

    console.log(toSelectFoods);

    return ctx.view('resources/menus/foods', {
      menu,
      foods: toSelectFoods,
      currentFoods,
    });
  },

  async store(ctx) {
    const menuId = +ctx.params.menuId;
    const foodId = +ctx.params.foodId;
    const { amount } = ctx.request.body;

    await MenuFood.create({
      menu_id: menuId,
      food_id: foodId,
      amount,
    });

    ctx.redirect(`/menus/${menuId}/foods`);
  },

  async amount(ctx) {
    const menuId = +ctx.params.menuId;
    const foodId = +ctx.params.foodId;

    return ctx.view('resources/menus/foodAmount', {
      menuId,
      foodId,
    });
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
