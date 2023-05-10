import { DataTypes } from 'sequelize';
import connection from '@/database/connection';

const FoodRestriction = connection.define('FoodRestriction', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
}, {
  indexes: [{
    unique: true,
    fields: ['food_id', 'restriction_id'],
  }],
});

export default FoodRestriction;
