import { DataTypes } from 'sequelize';
import connection from '@/database/connection';
import FoodRestriction from './FoodRestriction';
import MenuFood from './MenuFood';

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
});

Food.associate = (models) => {
  const { Restriction, Menu } = models;

  Food.belongsToMany(Menu, {
    through: MenuFood,
    foreignKey: 'food_id',
  });

  Food.belongsToMany(Restriction, {
    through: FoodRestriction,
    foreignKey: 'food_id',
  });
};

export default Food;
