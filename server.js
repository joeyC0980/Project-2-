const express = require("express");
const app = express();
const methodOverride = require("method-override");
require("dotenv").config();

const PORT = process.env.PORT || 3003;

const Gift = require("./models/gift.js");
const Users = require("./models/users.js");
// const Mains = require("./models/main.js")
const path = require("path");
const giftsController = require("./controllers/gift.js");
const usersController = require("./controllers/users.js");
const mainsController = require("./controllers/main.js");
const session = require("express-session");

///////////
// access session
const SESSION_SECRET = process.env.SESSION_SECRET;
console.log("Here is the session secret");
console.log(SESSION_SECRET);

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

//connect with mongoose

const mongoose= require("mongoose")
mongoose.connect(process.env.DATABASE_URI);


  


const db = mongoose.connection;
db.on("error", (err) => console.log(err.message + " is mongo not running?"));
db.on("connected", () => console.log("mongo connected"));
db.on("disconnected", () => console.log("mongo disconnected"));

//Middleware

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("CSSmain"));

app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/gifts", giftsController);
app.use("/users", usersController);
app.use("/mains", mainsController);



// Listener

app.listen(PORT, () => console.log(`server is listning on port: ${PORT}`));
