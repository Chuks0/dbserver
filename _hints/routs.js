const express = require("express");
const router = express.Router();

const {
  addNoUserHint,
  addUserHint,
  getHintU,
  getHintQ,
} = require("./controllers");

router.route("/").post(addNoUserHint);
router.route("/:id").post(addUserHint);
router.route("/U/").get(getHintU);
router.route("/Q/").get(getHintQ);

module.exports = router;
