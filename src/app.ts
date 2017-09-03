/**
 * Module dependencies.
 */
import * as express from "express";
import * as compression from "compression";  // compresses requests
import * as session from "express-session";
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as lusca from "lusca";
import * as dotenv from "dotenv";
import * as mongo from "connect-mongo";
import * as flash from "express-flash";
import * as path from "path";
import * as mongoose from "mongoose";
import * as passport from "passport";
import expressValidator = require("express-validator");


const MongoStore = mongo(session);

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({path: ".env.example"});


/**
 * Controllers (route handlers).
 */
import * as HomeController from "./controllers/home";
import * as UserController from "./controllers/user";
import * as ContactController from "./controllers/contact";
import * as RoomsController from "./controllers/rooms";

/**
 * API keys and Passport configuration.
 */
import * as passportConfig from "./config/passport";

/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
// mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);

mongoose.connection.on("error", () => {
  console.log("MongoDB connection error. Please make sure MongoDB is running.");
  process.exit();
});


/**
 * Express configuration.
 */
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(compression());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
    autoReconnect: true
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  if (!req.user &&
    req.path !== "/login" &&
    req.path !== "/signup" &&
    !req.path.match(/^\/auth/) &&
    !req.path.match(/\./)) {
    req.session.returnTo = req.path;
  } else if (req.user &&
    req.path == "/account") {
    req.session.returnTo = req.path;
  }
  next();
});
app.use(express.static(path.join(__dirname, "public"), {maxAge: 31557600000}));

/**
 * Primary app routes.
 */
app.get("/", HomeController.index);
app.get("/login", UserController.getLogin);
app.post("/login", UserController.postLogin);
app.get("/logout", UserController.logout);
app.get("/forgot", UserController.getForgot);
app.post("/forgot", UserController.postForgot);
app.get("/reset/:token", UserController.getReset);
app.post("/reset/:token", UserController.postReset);
app.get("/signup", UserController.getSignup);
app.post("/signup", UserController.postSignup);
app.get("/contact", ContactController.getContact);
app.post("/contact", ContactController.postContact);
app.get("/account", passportConfig.isAuthenticated, UserController.getAccount);
app.post("/account/profile", passportConfig.isAuthenticated, UserController.postUpdateProfile);
app.post("/account/password", passportConfig.isAuthenticated, UserController.postUpdatePassword);
app.post("/account/delete", passportConfig.isAuthenticated, UserController.postDeleteAccount);
app.get("/account/unlink/:provider", passportConfig.isAuthenticated, UserController.getOauthUnlink);

app.get("/rooms", passportConfig.isAuthenticated, RoomsController.getMyRooms);
app.get("/rooms/discover", passportConfig.isAuthenticated, RoomsController.discoverRooms);

/**
 * OAuth authentication routes. (Sign in)
 */
app.get("/auth/facebook", passport.authenticate("facebook", {scope: ["email", "public_profile"]}));
app.get("/auth/facebook/callback", passport.authenticate("facebook", {failureRedirect: "/login"}), (req, res) => {
  res.redirect(req.session.returnTo || "/");
});

module.exports = app;