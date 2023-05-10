import { DataTypes } from 'sequelize';
import connection from '@/database/connection';
import PatientRestriction from './PatientRestriction';

const Patient = connection.define('Patient', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: false,
  },
  document: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: false,
  },
  height: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: false,
  },
  weight: {
    type: DataTypes.REAL,
    allowNull: false,
    primaryKey: false,
  },
  sex: {
    type: DataTypes.CHAR(1),
    allowNull: false,
    primaryKey: false,
  },
  historic: {
    type: DataTypes.STRING,
    allowNull: true,
    primaryKey: false,
  },
});

Patient.associate = (models) => {
  const { Menu, Restriction } = models;

  Patient.belongsToMany(Restriction, {
    through: PatientRestriction,
    foreignKey: 'patient_id',
  });

  Patient.hasMany(Menu, {
    foreignKey: 'menu_id',
  });
};

export default Patient;
