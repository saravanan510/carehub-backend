const express = require("express");
const router = express.Router();
const serviceCtrl = require("../app/controllers/serviceCtrl");

router.post("/", serviceCtrl.create);

module.exports = router;
