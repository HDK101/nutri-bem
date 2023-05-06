import { DataTypes } from 'sequelize';
import connection from '@/database/connection';
import FoodRestriction from './FoodRestriction';

const Food = connection.define('Food', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Food.associate = (models) => {
  const { Restriction, Menu } = models;

  Food.belongsToMany(Menu, {
    through: 'menu_food',
  });

  Food.belongsToMany(Restriction, {
    through: FoodRestriction,
    foreignKey: 'food_id',
  });
};

export default Food;
