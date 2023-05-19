import { DataTypes } from 'sequelize';
import connection from '@/database/connection';

const MenuPatient = connection.define('MenuPatient', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
}, {
  indexes: [{
    unique: true,
    fields: ['patient_id', 'menu_id'],
  }],
});

export default MenuPatient;
