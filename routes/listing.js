const router = require("express").Router();
const wrapAsync = require("../utils/wrapAsync")
const ExpressError = require("../utils/ExpressError")
const Listing = require("../models/listing");
const methodOverride = require('method-override')
const { isLoggedin, isOwner } = require("../middleware.js");
const { listingSchema } = require("../schema.js");
const listingController = require("../controller/listing.js");

//listing server validate schema
let validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else {
        next();
    }
}

router.route("/")
    //index route
    .get(wrapAsync(listingController.index))
    //index route
    .get(wrapAsync(listingController.index1)
    )
    //create route
    .post(
        validateListing,
        isLoggedin,
        wrapAsync(listingController.createnew
        ))


//new route
router.get("/new", isLoggedin,
    listingController.new)

        
router.route("/:id")
    //show route
    .get(wrapAsync(listingController.show)
    )
    
//update route
.put(
    validateListing,
    isLoggedin,
    isOwner,
    wrapAsync(listingController.update
    ))

//delete route
.delete(
    isLoggedin,
    isOwner,
    wrapAsync(listingController.delete))







//edit route
router.get("/:id/edit",
    isLoggedin,
    isOwner,
    wrapAsync(listingController.edit))


module.exports = router;