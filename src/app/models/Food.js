import { DataTypes } from 'sequelize';
import connection from '@/database/connection';

const Food = connection.define('Alimento', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Food.associate = (models) => {
  const { Restriction, Menu } = models;

  // Acho que alimento para cardapio vai ser M:N
  Food.belongsTo(Menu, {
    constraints: true,
    foreignKey: 'menu_id',
  });

  Food.hasMany(Restriction, {
    foreignKey: 'food_id',
  });
};

export default Food;
