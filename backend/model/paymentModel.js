module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define("payment", {
    amount: {
      type: DataTypes.STRING,
    },
  });
  return Payment;
};
