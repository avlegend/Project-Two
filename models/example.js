module.exports = (sequelize, DataTypes) => {
  const Example = sequelize.define("Example", {
    title: DataTypes.STRING,
    directions: DataTypes.TEXT
  });

  Example.associate = function(models) {
    models.Example.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Example;
};
