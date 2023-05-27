/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FoodRestrictions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      restriction_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Restrictions',
          key: 'id',
        },
      },
      food_Id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Food',
          key: 'id',
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('FoodRestrictions');
  },
};
