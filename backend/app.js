require("dotenv").config()
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const authRoute = require("./routes/authRoute");
const courseRoute = require("./routes/courseRoute");
const adminRoute = require("./routes/adminRoute");
const userRoute = require("./routes/userRoute");
const passport = require("passport");
const { users, profile } = require("./model/index");
const generateToken = require("./services/generateToken");
const progressRoute = require('./routes/progressRoute');

app.use(passport.initialize());
app.use(passport.session());

require("./model/index");
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

passport.serializeUser(function (user, cb) {
  cb(null, user); // cb(error,success) --> cb(error)
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});


var userProfile;
let GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.G_CLIENT,
      clientSecret: process.env.G_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      return done(null, userProfile);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000",
  }),
  async function (req, res) {
    const userGoogleEmail = userProfile.emails[0].value;
    // check if google lay deko email already table ma exists xa ki nae vanerw
    const user = await users.findOne({
      where: {
        email: userGoogleEmail,
      },
    });
    if (user) {
      const token = generateToken(user);
      res.redirect("http://localhost:5173/google?token=" + token);
    } else {
      // register the user
      const user = await users.create({
        email: userGoogleEmail,
        googleId: userProfile.id,
        firstName: userProfile.name.givenName,
        lastName: userProfile.name?.familyName || "xyz",
      });

      if (user) {
        await profile.create({
          userId: user.id,
          googlePhoto: userProfile.photos[0].value,
        });
      }

      const token = generateToken(user);

      res.redirect("http://localhost:5173/google?token=" + token);
    }
  }
);

app.use("", authRoute);
app.use("/teacher", courseRoute);
app.use("", adminRoute);
app.use("/user", userRoute);
app.use('/progress/course', progressRoute);

const port = 3000;
app.listen(port, () => {
  console.log("Server has started at port", port);
});
