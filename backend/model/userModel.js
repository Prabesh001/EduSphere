module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull : false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull:false
      },
      password: {
        type: DataTypes.STRING
      },
      otp : {
        type : DataTypes.STRING,
        allowNull : true
      },
      otpGeneratedTime : {
        type : DataTypes.STRING,
        allowNull : true
      },
      
      role  : {
        type : DataTypes.ENUM("user","admin",'teacher'),
        defaultValue : "user"
      },
      googleId : {
        type : DataTypes.STRING,
      }
    
    });
    return User;
  };