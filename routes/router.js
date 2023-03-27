const express = require("express");
const controllers = require("../files");

const router = express.Router();

router.route("/").get(controllers.getFiles).post(controllers.createFile);

router.route("/:filename").get(controllers.getFile);

module.exports = router;
