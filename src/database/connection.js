import { Sequelize } from 'sequelize';

const connection = new Sequelize({
  dialect: 'sqlite',
  storage: './dev.sqlite',
});

export default connection;
