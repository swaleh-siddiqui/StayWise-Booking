const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload  = multer({dest : "uploads/"});

const Listing = require("../models/listing.js");

const wrapAsync = require("../utils/wrapasync.js");

const {isLoggedIn, isOwner, validateListing} = require("../middlewares.js");






// all listings

router.get("", wrapAsync(async (req,res) => {
    const listings = await Listing.find();
    res.render("./listings/listings.ejs", {listings})
}))

// add new listing
router.get("/new", isLoggedIn ,  (req,res) => {
    res.render("./listings/new_listing.ejs")
})

router.post("",isLoggedIn, validateListing, wrapAsync( async (req,res) => {
    const newlisting = new Listing(req.body.ob)
    newlisting.owner = req.user._id;
    await newlisting.save();
    req.flash("success", "New listing created");
    res.redirect("/listings");
}))

// show listing
router.get("/:id", wrapAsync(async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path : "reviews",
        populate : {
            path : "author"
        }
    })
    .populate("owner");

    if (!listing){
        req.flash("error", "Listing You are trying to reach does not exist");
        res.redirect("/listings");
    }
    res.render("./listings/show_listing.ejs", {listing})
}))


// update listing
router.get("/:id/edit", isLoggedIn, isOwner ,  wrapAsync(async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("owner");
    if (!listing){
        req.flash("error", "Listing You are trying to reach does not exist");
        return res.redirect("/listings");
    }
    res.render("./listings/edit_listing.ejs", {listing})
}))


router.patch("/:id" , isLoggedIn, isOwner, validateListing, wrapAsync(async (req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.ob});
    req.flash("success", "Listing updated");
    res.redirect("/listings/" +id);
}))


// delete listing
router.delete("/:id" , isLoggedIn, isOwner, wrapAsync(async (req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "isting deleted");
    res.redirect("/listings");
}))




module.exports = router;