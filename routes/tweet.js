const router = require("express").Router();
const Tweet = require("../models/Tweet.model");
const isLoggedIn = require("../middleware/isLoggedIn");

//This pulls up the create tweet form
router.get("/create-tweet", (req, res, next) => {
  res.render("create-tweet");
});

//This saves a new tweet in the database
router.post("/create-tweet", isLoggedIn, (req, res, next) => {
  Tweet.create({
    title: req.body.title,
    content: req.body.content,
    creatorId: req.user._id,
  })
    .then((newTweet) => {
      console.log("A new tweet was created", newTweet);
      res.redirect("/");
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

//This pulls all tweets from a database
router.get("/all-tweets", (req, res) => {
  Tweet.find()
    .populate("creatorId")
    .then((allTweets) => {
      console.log("All tweets", allTweets);
      res.render("all-tweets", { tweets: allTweets });
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

module.exports = router;
