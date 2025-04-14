module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("review", {
    comment: {
      type: DataTypes.STRING,
    },
    rating: { type: DataTypes.INTEGER, allowNull: false },
  });
  return Review;
};
