import { DataTypes } from 'sequelize';
import connection from '@/database/connection';
import Alimento from './Alimento';

const Cardapio = connection.define("Cardapio", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    horario: {
        type: DataTypes.TIME,
        allowNull: false,
        primaryKey: false
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false
    },
    observacoes: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
        defaultValue: "Nada consta"
    }
});

Cardapio.hasMany(Alimento, {
    foreignKey: "idCardapio"
});

Alimento.belongsTo(Cardapio, {
    constraints: true,
    foreignKey: "idCardapio"
});

export default Cardapio;