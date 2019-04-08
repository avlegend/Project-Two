module.exports = (sequelize, DataTypes) => {
    const recipe = sequelize.define("recipe", {
      // Giving the recipe model a name of type STRING
      name: DataTypes.STRING
    });
    return recipe;
  };
  