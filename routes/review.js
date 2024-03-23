const express = require("express");
const router = express.Router({mergeParams : true});

const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

const wrapAsync = require("../utils/wrapasync.js")

const {validateReview, isLoggedIn, isAuthor} = require("../middlewares.js");


// listing new review
router.get("", isLoggedIn,  wrapAsync(async (req,res) => {
    let listingid = req.params.id;
    res.render("./reviews/new_review.ejs", {listingid});
}))

router.post("",isLoggedIn, validateReview, wrapAsync(async (req,res) => {
    let listing = await Listing.findById(req.params.id);
    let newrev = new Review(req.body.ob);
    newrev.author = req.user._id;

    listing.reviews.push(newrev)

    await listing.save();
    await newrev.save();

    let id = req.params.id;

    req.flash("success", "New Review added");

    res.redirect("/listings/" + id);
}))


// delete reviews
router.delete("/:reviewid", isLoggedIn, isAuthor, wrapAsync(async (req,res) => {
    let id = req.params.id;
    let reviewid = req.params.reviewid;
    await Listing.findByIdAndUpdate(id, {$pull : {reviews : reviewid}})
    await Review.findByIdAndDelete(reviewid);
    req.flash("success", "Review deleted");
    res.redirect("/listings/" + id)
}))

module.exports = router;