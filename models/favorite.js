module.exports = (sequelize, DataTypes) => {

  // This is gonna store faviorte data table for unique user
  const Favorite = sequelize.define("Favorite", {
    // Giving the recipe model a name of type STRING
    title: {
      type: DataTypes.STRING
    }
  });

  // This stores User unique data to database
  Favorite.associate = function (models) {
    models.Favorite.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Favorite;
};
