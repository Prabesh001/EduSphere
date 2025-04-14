module.exports = (sequelize, DataTypes) => {
  const VideoProgress = sequelize.define("videoProgress", {
    currentTime: {
      type: DataTypes.INTEGER,
    },
  });
  return VideoProgress;
};
