const { encrypt } = require("../../routes/ccavutil");
const paymentCtrl = {};
paymentCtrl.initiatePayment = (req, res) => {
  const {
    fullName,
    email,
    phoneNumber,
    date,
    time,
    tests,
    redirect,
    cancel,
    billing_email,
  } = req.body;
  const amount = tests.reduce((sum, test) => sum + test.price, 0);
  const orderId = `ORDER${Date.now()}`;

  const billingInfo = {
    merchant_id: process.env.CCA_MERCHANT_ID,
    order_id: orderId,
    currency: "INR",
    amount: amount.toFixed(2),
    redirect_url: redirect,
    cancel_url: cancel,
    language: "EN",
    billing_email: billing_email,
  };
  console.log("billingInfo", billingInfo);
  const encryptedData = encrypt(
    require("qs").stringify(billingInfo),
    process.env.CCA_WORKING_KEY
  );

  res.json({
    accessCode: process.env.CCA_ACCESS_CODE,
    encryptedData,
    gatewayUrl: process.env.CCA_GATEWAY_URL,
  });
};

module.exports = paymentCtrl;
