const router = require("express").Router();
const User = require("../models/User.model");
const Tweet = require("../models/Tweet.model");

//Gets the user's profile pag
router.get("/profile/:userId", (req, res, next) => {
  User.findById(req.params.userId)
    .then((foundUser) => {
      Tweet.find({ creatorId: req.params.userId })
        .then((foundTweets) => {
          console.log("Found all of the tweets", foundTweets);
          res.render("profile-page", { user: foundUser, tweets: foundTweets });
        })
        .catch((err) => {
          console.log("Something went wrong", err);
        });
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

module.exports = router;
