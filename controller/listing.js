const Listing = require('../models/listing');

module.exports.index = async (req, res) => {
    let allListing = await Listing.find({});
    res.render("./listings/index.ejs", { allListing })
};

module.exports.index1 = async (req, res) => {
    let allListing = await Listing.find({});
    res.render("./listings/index.ejs", { allListing })
}

module.exports.new = (req, res) => {
    res.render("./listings/new.ejs")
}

module.exports.show = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate({
        path: "reviews", populate: {
            path: "author",
        }
    }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing is not exist");
        res.redirect("/listings")
    }
    res.render("./listings/show.ejs", { listing });
}


module.exports.createnew = async (req, res, next) => {
    let newListing = new Listing(req.body.listing);
    // console.log(req.user);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "listing was saved");
    res.redirect("/listings");
}

module.exports.edit = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing is not exist")
        res.redirect("/listings")
    }
    res.render("./listings/edit.ejs", { listing })
}


module.exports.update = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "listing was updated")
    res.redirect(`/listings/${id}`);
}


module.exports.delete = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "listing was deleted")
    res.redirect("/listings");
}