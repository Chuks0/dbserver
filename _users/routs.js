const express = require("express");
const router = express.Router();

const { updateUser, getMC, getHP } = require("./controllers");

router.route("/").post(updateUser);
router.route("/m/c").get(getMC);
router.route("/h/p").get(getHP);

module.exports = router;
