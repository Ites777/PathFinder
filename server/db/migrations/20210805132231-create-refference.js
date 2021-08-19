'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('References', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: {
            tableName: 'Users'
          },
          key: 'id'
        }
      },
      routes_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: {
            tableName: 'Routes'
          },
          key: 'id'
        }
      },
      favorites: {
       type: Sequelize.BOOLEAN
      },
      creator: {
        type: Sequelize.BOOLEAN
       },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    await queryInterface
    .addConstraint('References', {
      type: 'UNIQUE',
      fields: ['user_id', 'routes_id'],
      name: 'unique',
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('References');
  }
};
