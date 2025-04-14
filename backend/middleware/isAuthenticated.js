const jwt = require("jsonwebtoken");

const { users } = require("../model");

exports.isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization;

  //check if token given or not
  if (!token) {
    return res.redirect("/login");
  }

  const decryptedResult = jwt.verify(token, "haha");

  // check if that id(userId) users table ma exist xa
  const userExist = await users.findAll({
    where: {
      id: decryptedResult.id,
    },
  });
  console.log(userExist, "userExist")

  //check if length is zero or not(zero->userExist gardaina)
  if (userExist.length == 0) {
    res.status(404).json({ message: "User with that token doesn't exist" });
  } else {
    [req.user] = userExist; // alternative decryptedResult.id
    req.userId = userExist[0].id;
    next();
  }
};
