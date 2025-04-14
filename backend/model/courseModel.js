module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define("course", {
    courseName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coursePrice: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    courseImage: {
      type: DataTypes.STRING,
    },
    courseDescription: {
      type: DataTypes.TEXT,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
  });
  return Course;
};
