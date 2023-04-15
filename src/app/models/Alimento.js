import { DataTypes } from 'sequelize';
import connection from '@/database/connection';
import Paciente from './Paciente';

const Alimento = connection.define("Alimento", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

Paciente.hasMany(Alimento, {
    foreignKey: "idPaciente"
});

Alimento.belongsTo(Paciente, {
    constraints: true,
    foreignKey: "idPaciente"
});

export default Alimento;