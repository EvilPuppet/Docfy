
module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.createTable('Projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true,
      },
      UserId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING(126).BINARY,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: (queryInterface) => {
    queryInterface.dropTable('Projects');
  },
};
