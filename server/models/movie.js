module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Movie.belongsTo(models.User, {
          foreignKey: 'UserId',
        });
      },
    },
  });
  return Movie;
};
