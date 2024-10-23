const router = require("express").Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controller/user");


router.route("/signup")
    .get(userController.signupForm)
    .post(wrapAsync(userController.signupPost)
    )


router.route("/login")
    .get(userController.loginForm)
    .post(saveRedirectUrl,
        passport.authenticate("local", {
            failureRedirect: "/login",
            failureFlash: true
        }), userController.loginPost)


router.get("/logout", userController.logout)

module.exports = router;