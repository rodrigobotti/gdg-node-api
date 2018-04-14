module.exports = {
  up: (queryInterface, Sequelize) => {
    const schema = {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(128),
        allowNull: false
      },
      salt: {
        type: Sequelize.STRING(16),
        allowNull: false
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    }
    const options = {
      timestamps: true,
      paranoid: false,
      underscored: true,
      freezeTableName: true
    }

    return queryInterface.createTable('user', schema, options)
      .then(() => queryInterface.addIndex('user', ['email'], { indexName: 'user_email_unique', indicesType: 'UNIQUE' }))
  },
  down: (queryInterface, Sequelize) => queryInterface.removeIndex('user', 'user_email_unique')
    .then(() => queryInterface.dropTable('user'))

}
