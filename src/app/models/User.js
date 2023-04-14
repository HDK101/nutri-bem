import { DataTypes } from 'sequelize';
import connection from '@/database/connection';

const User = connection.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
});

export default User;
