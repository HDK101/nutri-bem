import { DataTypes } from 'sequelize';
import connection from '@/database/connection';

const PatientRestriction = connection.define('PatientRestriction', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
}, {
  indexes: [{
    unique: true,
    fields: ['patient_id', 'restriction_id'],
  }],
});

export default PatientRestriction;
