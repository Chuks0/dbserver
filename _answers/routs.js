const express = require("express");
const router = express.Router();

const {
  addAnswerNoUser,
  addAnswerWithUser,
  userAccuracy,
} = require("./controllers");

router.route("/").post(addAnswerNoUser);
router.route("/user/").post(addAnswerWithUser);
router.route("/:id").get(userAccuracy);

module.exports = router;
