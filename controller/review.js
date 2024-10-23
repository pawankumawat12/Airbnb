const Review = require("../models/review");
const Listing = require("../models/listing")
module.exports.addReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${listing.id}`);
}

module.exports.deleteReview = async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review was deleted")
    res.redirect(`/listings/${id}`);
}

module.exports.editReview = async (req, res) => {
    let { reviewId } = req.params;
    let listing = await Listing.findById(req.params.id);
    let review = await Review.findById(reviewId);
    if(!review){
        req.flash("error", "Review is not exist")
        res.redirect("/listings")
    }
    res.render("./listings/editReview.ejs", { review, listing })
}

module.exports.updateReview = async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $addToSet: { reviews: reviewId } })
    await Review.findByIdAndUpdate(reviewId, { ...req.body.review });
    req.flash("success", "Review was updated")

    res.redirect(`/listings/${id}`);
}   