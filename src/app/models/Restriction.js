import { DataTypes } from 'sequelize';
import connection from '@/database/connection';

const Restriction = connection.define('Restriction', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Restriction.associate = (models) => {
  const { Food, Patient } = models;

  // Acho que as restricoes sera M:N para pacientes
  Restriction.belongsTo(Patient, {
    foreignKey: 'patient_id',
  });

  // Acho que as restricoes sera M:N para alimentos
  Restriction.belongsTo(Food, {
    foreignKey: 'food_id',
  });
};

export default Restriction;
