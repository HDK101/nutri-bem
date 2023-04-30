import { DataTypes } from 'sequelize';
import connection from '@/database/connection';

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
    type: DataTypes.STRING,
    allowNull: true,
    primaryKey: false,
  },
});

Menu.associate = (models) => {
  const { Food } = models;

  Menu.hasMany(Food, {
    foreignKey: 'menu_id',
  });
};

export default Menu;
