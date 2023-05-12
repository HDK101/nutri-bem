import { DataTypes } from 'sequelize';
import connection from '@/database/connection';

const MenuFood = connection.define('MenuFood', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
}, {
  indexes: [{
    unique: true,
    fields: ['food_id', 'menu_id'],
  }],
});

export default MenuFood;
