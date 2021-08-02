require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("express-flash");
const MongoDbStore = require("connect-mongo");

//DATABASE CONNECTION
const url = "mongodb://localhost/pizza";
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});
const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Connection Failed...");
  });
//SESSION STORE
let mongoStore = MongoDbStore.create({
  mongoUrl:url,
  collectionName:"sessions",
})
//SESSION CONFIG
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store:mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);
app.use(flash());
//GLOBAL MIDDLEWARE
app.use((req,res,next)=>{
  res.locals.session = req.session
  next();
})
//SET TEMPLATE ENGINE
app.use(expressLayouts);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

//ASSETS
app.use(express.static("public"));
app.use(express.json())
//ROUTES CONFIGURATION
require("./routes/web")(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
