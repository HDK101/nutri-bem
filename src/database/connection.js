import { Sequelize } from 'sequelize';

const connection = new Sequelize('sqlite::memory:');

export default connection;
