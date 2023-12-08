const express = require("express");
const router = express.Router();

const { getRQ, getRUQ, getHP, getMC } = require("./controllers");

router.route("/").get(getRQ);
router.route("/:id").get(getRUQ);
router.route("/m/c").get(getMC);
router.route("/h/p").get(getHP);

module.exports = router;
