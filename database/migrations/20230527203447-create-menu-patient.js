/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MenuPatients', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      menu_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Menus',
          key: 'id',
        },
      },
      patient_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Patients',
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
    await queryInterface.dropTable('MenuPatients');
  },
};
