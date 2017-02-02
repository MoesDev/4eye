module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Movie, {
          foreignKey: 'movieId',
          as: 'userMovies',
        });
      },
    },
  });
  return User;
};
