import { DataTypes } from 'sequelize';
import connection from '@/database/connection';
import MenuFood from './MenuFood';

const Menu = connection.define('Menu', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
    primaryKey: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: false,
  },
  notes: {
    // type: DataTypes.STRING,
    allowNull: true,
    primaryKey: false,
  },
});

Menu.associate = (models) => {
  const { Food } = models;

  Menu.belongsToMany(Food, {
    through: MenuFood,
  });
};

export default Menu;
