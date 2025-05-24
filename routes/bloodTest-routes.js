const express = require("express");
const router = express.Router();
const bloodTestCtrl = require("../app/controllers/bloodTestCtrl");

router.post("/", bloodTestCtrl.create);

module.exports = router;
