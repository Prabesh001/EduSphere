module.exports = (sequelize, DataTypes) => {
  const Enroll = sequelize.define("enroll", {
    enrollDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paymentStatus: { type: DataTypes.BOOLEAN, default: false },
  });
  return Enroll;
};
