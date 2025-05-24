const BloodTests = require("../models/bloodTest-model");
const bloodTestCtrl = {};

bloodTestCtrl.create = async (req, res) => {
  const data = req.body;
  data.status = "Pending";

  try {
    const bloodtest = BloodTests.create(data);
    if (bloodtest) {
      res
        .status(200)
        .json({ message: "Appointment booked and confirmation sent!" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error booking appointment. Please try again later." });
  }
};

module.exports = bloodTestCtrl;
