const router = require("express").Router({ mergeParams: true });
//parent router me kuch perameter ho or vo use ho sakte hai hamare callbacks ke under to hum mergParams: true use me lete hai
const wrapAsync = require("../utils/wrapAsync")
const ExpressError = require("../utils/ExpressError")
const Review = require("../models/review.js")
const Listing = require("../models/listing");
const methodOverride = require('method-override')
const reviewController = require("../controller/review.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const { isLoggedin, isReviewAuthor } = require("../middleware.js");
const review = require("../models/review.js");

//review server validate schema
let validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else {
        next();
    }
}

router.route("/:reviewId")
//review delete route
.delete(isLoggedin,
    isReviewAuthor,
     wrapAsync(reviewController.deleteReview)
)


//update edit route
.put(isLoggedin,
    isReviewAuthor,
    validateReview,
    wrapAsync(reviewController.updateReview)
)



//reviews
//post route
router.post("/",
    isLoggedin,
    validateReview,
    wrapAsync(reviewController.addReview)
)




//edit review route
router.get("/:reviewId/edit", 
    isLoggedin,
    isReviewAuthor,
    wrapAsync(reviewController.editReview))



module.exports = router;
