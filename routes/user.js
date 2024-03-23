const express = require("express");
const router = express.Router({mergeParams : true});
const User = require("../models/user.js")

const wrapAsync = require("../utils/wrapasync.js")
const ExpressError = require("../utils/expresserror.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares.js");





// user signup

router.get("/user_signup" , (req,res) => {
    res.render("./users/user_signup.ejs");
})

router.post("/user_signup", wrapAsync(async (req,res) => {
    try{
        let {username, email, password} = req.body;
        const newuser = new User({email, username});
        const user = await User.register(newuser, password);
        req.logIn(user , (err) => {
            if (err){
                return next(err);
            }
            req.flash("success" , "Welcome to StayWise");
            res.redirect("/listings");
        })
        // req.flash("success" , "Welcome to StayWise");
        // res.redirect("/listings");
    }
    catch (e) {
        req.flash("error" , e.message);
        res.redirect("/user/user_signup");
    }
}))




// user login

router.get("/user_login" , (req,res) => {
    res.render("./users/user_login.ejs");
})

router.post("/user_login" , 
    saveRedirectUrl,
    passport.authenticate(
        "local",
        {
            failureRedirect : "/user/user_login",
            failureFlash : true
        }
    ),
    async (req,res) => {
        req.flash("success" , "Logged in successfully")
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
})




// user logout

router.get("/user_logout", (req,res, next) => {
    req.logOut((err) => {
        if (err){
            return next(err);
        }
        req.flash("success" , "Goodbye user");
        res.redirect("/listings");
    })
})

module.exports = router;