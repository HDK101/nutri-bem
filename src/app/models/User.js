import { DataTypes } from 'sequelize';
import connection from '@/database/connection';

const User = connection.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  login: {
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    unique: true
  }
});

export default User;
