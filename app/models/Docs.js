module.exports = (sequelize, DataTypes) => {
  const Docs = sequelize.define('Docs', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  });

  Docs.associate = (models) => {
    Docs.belongsTo(models.Category);
  };

  return Docs;
};
