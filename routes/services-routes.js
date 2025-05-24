const express = require("express");
const router = express.Router();
const serviceCtrl = require("../app/controllers/serviceCtrl");

router.get("/", serviceCtrl.show);

module.exports = router;
