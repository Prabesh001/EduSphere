module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define("profile", {
    photoUrl: {
      type: DataTypes.STRING,
    },
    googlePhoto: {
      type: DataTypes.STRING,
    },
  });
  return Profile;
};
