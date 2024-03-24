if (process.env.NODE_ENV != "production"){
    require("dotenv").config();
}
console.log(process.env.SECRET);

const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session");
const ejsMate = require("ejs-mate");
let path = require("path");
const passport = require("passport");
const localStrategy = require("passport-local");
const flash = require("connect-flash");

const User = require("./models/user.js");

const wrapAsync = require("./utils/wrapasync.js");
const ExpressError = require("./utils/expresserror.js");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const users = require("./routes/user.js");

const app = express();
let port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.engine('ejs', ejsMate);
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));



// session 

const sessionOptions = {
    secret : "supersecret",
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + (7*24*60*60*1000),
        maxAge : 7*24*60*60*1000,
        httpOnly : true
    }
};

// middleware

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})





// mongo connect

const db_url = 'mongodb://127.0.0.1:27017/staywise';

main()
    .then(
        console.log("successfull")
    )
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(db_url);
}

// home

app.get("/", (req,res) => {
    res.render("./listings/index.ejs");
})

// listing routes

app.use("/listings" , listings);


// review routes

app.use("/listings/:id/review" , reviews);


// user routes

app.use("/user" , users);




// error handling

app.all("*" , (req,res,next) => {
    next(new ExpressError(404, "page not found"));
})

app.use((err, req , res, next) => {
    let {statusCode = 500 , message = "Sometghing went wrong"} = err;
    // res.status(statusCode).send(message);
    res.render("error.ejs" , {statusCode, message});
})

app.listen(port, () =>{
    console.log("HI staywise")
}) 