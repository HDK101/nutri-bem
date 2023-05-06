import FoodRestriction from '../models/FoodRestriction';

const FoodRestrictionController = {
  async associate(ctx) {
    const foodId = +ctx.params.foodId;
    const restrictionId = +ctx.params.restrictionId;

    ctx.body = await FoodRestriction.create({
      Food: foodId,
      Restriction: restrictionId,
    });
  }
}

export default FoodRestrictionController;
