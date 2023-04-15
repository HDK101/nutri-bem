import { DataTypes } from 'sequelize';
import connection from '@/database/connection';
import Alergias from './Alergias';

const Paciente = connection.define("Paciente", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: false
    },
    altura: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false
    },
    peso: {
        type: DataTypes.REAL,
        allowNull: false,
        primaryKey: false
    },
    sexo: {
        type: DataTypes.CHAR(1),
        allowNull: false,
        primaryKey: false,
    },
    historico: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
        defaultValue: "Nada consta"
    }
});


// Adicionando chave estrangeira para tabela que representa alergias de um paciente
Paciente.hasMany(Alergias, {
    foreignKey: "idPaciente"
});

Alergias.belongsTo(Paciente, {
    constraints: true,
    foreignKey: "idPaciente"
});

export default Paciente;