import { DataTypes } from 'sequelize';
import connection from '@/database/connection';

const Alergias = connection.define("Alergias", {
    alergia: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Nada consta"
    }
});

export default Alergias;