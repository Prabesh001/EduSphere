module.exports = (sequelize, DataTypes) => {
    const CourseChapter = sequelize.define("courseChapter", {
      chapterTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      chapterDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      courseVideo: {
        type: DataTypes.STRING,
      },
      chapterStatus: {
        type : DataTypes.ENUM("published","unpublished"),
        defaultValue : "published"
      },
      chapterType: {
        type : DataTypes.ENUM("free","premium"),
        defaultValue : "free"
      }
    
    });
    return CourseChapter;
  };