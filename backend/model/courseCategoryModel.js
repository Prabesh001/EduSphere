module.exports = (sequelize, DataTypes) => {
    const CourseCategory = sequelize.define("courseCategory", {
      categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    
    });
    return CourseCategory;
  };