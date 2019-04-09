module.exports = (sequelize, DataTypes) => {
    const Favorite = sequelize.define("Favorite", {
      // Giving the recipe model a name of type STRING
      name: DataTypes.STRING
    });

    Favorite.associate = function(models) {
      models.Favorite.belongsTo(models.User, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false
        }
      });
    };
    return Favorite;
  };
  