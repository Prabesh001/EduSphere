const seedAdmin = require("../adminSeeder.js");
const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");

// la sequelize yo config haru lag ani database connect gardey vaneko hae
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  port: 3306,
  // port : 7013,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// importing model files

db.users = require("./userModel.js")(sequelize, DataTypes);
db.profile = require("./profileModel.js")(sequelize, DataTypes);
db.courses = require("./courseModel.js")(sequelize, DataTypes);
db.chapters = require("./courseChaptersModel.js")(sequelize, DataTypes);
db.categories = require("./courseCategoryModel.js")(sequelize, DataTypes);
db.enroll = require("./enrollMentModel.js")(sequelize, DataTypes);
db.video = require("./VideoModel.js")(sequelize, DataTypes);
db.review = require("./ReviewModel.js")(sequelize, DataTypes);
db.payment = require("./paymentModel.js")(sequelize, DataTypes);

sequelize
  .authenticate()
  .then(async () => {
    seedAdmin(db.users);
    // check if admin exists or not
  })
  .catch((err) => {
    console.log("Error" + err);
  });

db.users.hasMany(db.courses);
db.courses.belongsTo(db.users);

db.users.hasOne(db.profile, { foreignKey: "userId" });
db.profile.belongsTo(db.users, { foreignKey: "userId" });

// relationships
db.courses.hasMany(db.chapters);
db.chapters.belongsTo(db.courses);

db.categories.hasMany(db.courses);
db.courses.belongsTo(db.categories);

db.users.hasMany(db.enroll);
db.enroll.belongsTo(db.users);

db.courses.hasMany(db.enroll);
db.enroll.belongsTo(db.courses);


db.enroll.hasMany(db.payment)
db.payment.belongsTo(db.enroll)

db.users.hasMany(db.payment);
db.payment.belongsTo(db.users);

db.chapters.hasMany(db.video);
db.video.belongsTo(db.chapters);

db.users.hasMany(db.video);
db.video.belongsTo(db.users);


db.courses.hasMany(db.review);
db.review.belongsTo(db.courses);

db.users.hasMany(db.review);
db.review.belongsTo(db.users);

db.sequelize.sync({ force: 0 }).then(() => {
  console.log("yes re-sync done");
});

module.exports = db;
