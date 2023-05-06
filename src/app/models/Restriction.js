import { DataTypes } from 'sequelize';
import connection from '@/database/connection';
import FoodRestriction from './FoodRestriction';
import PatientRestriction from './PatientRestriction';

const Restriction = connection.define('Restriction', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Restriction.associate = (models) => {
  const { Food, Patient } = models;

  Restriction.belongsToMany(Patient, {
    through: PatientRestriction,
    foreignKey: 'restriction_id',
  });

  Restriction.belongsToMany(Food, {
    through: FoodRestriction,
    foreignKey: 'restriction_id',
  });
};

export default Restriction;
