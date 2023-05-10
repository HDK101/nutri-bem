import {Op} from "sequelize";
import Food from "../models/Food";
import FoodRestriction from "../models/FoodRestriction";
import Restriction from "../models/Restriction";

const FoodRestrictionController = {
  async index(ctx) {
    const foodId = +ctx.params.foodId;
    const food = await Food.findByPk(foodId, {
      include: Restriction,
    });

    const restrictionIds = food.Restrictions.map(f => f.id);
    const restrictions = await Restriction.findAll({
      where: {
        id: {
          [Op.notIn]: restrictionIds,
        },
      },
    });

    return ctx.view('resources/foods/associate', {
      food,
      restrictions,
      currentRestrictions: food.Restrictions,
    });
  },

  async store(ctx) {
    const foodId = +ctx.params.foodId;
    const restrictionId = +ctx.params.restrictionId;

    ctx.body = await FoodRestriction.create({
      food_id: foodId,
      restriction_id: restrictionId,
    });

    ctx.redirect(`/foods/${foodId}/restrictions`);
  },

  async destroy(ctx) {
    const foodId = +ctx.params.foodId;
    const restrictionId = +ctx.params.restrictionId;

    ctx.body = await FoodRestriction.destroy({
      where: {
        food_id: foodId,
        restriction_id: restrictionId,
      },
    });

    ctx.redirect(`/foods/${foodId}/restrictions`);
  },
};

export default FoodRestrictionController;
