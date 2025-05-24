// routes/payment.js
const express = require("express");
const router = express.Router();
const paymentCtrl = require("../app/controllers/paymentCtrl");

router.post("/initiate-payment", paymentCtrl.initiatePayment);

module.exports = router;
