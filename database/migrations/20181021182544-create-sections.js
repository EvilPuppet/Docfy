module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.createTable('Sections', {
      id: {
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      ProjectId: {
        allowNull: false,
        references: { model: 'Projects', key: 'id' },
        type: DataTypes.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING(126).BINARY,
      },
      content: {
        allowNull: true,
        type: DataTypes.TEXT,
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
    queryInterface.dropTable('Sections');
  },
};
