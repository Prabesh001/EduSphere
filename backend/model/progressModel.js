module.exports = (sequelize, DataTypes) => {
  const Progress = sequelize.define('Progress', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    course_id: { type: DataTypes.INTEGER, allowNull: false },
    chapter_id: { type: DataTypes.INTEGER, allowNull: false },
    progress: { type: DataTypes.FLOAT, allowNull: false },
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return Progress;
};
