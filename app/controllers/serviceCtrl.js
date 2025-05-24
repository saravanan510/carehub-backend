const Services = require("../models/service-model");
const nodemailer = require("nodemailer");
const serviceCtrl = {};

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "Insurance@carehubuae.com", // Sender's email
    pass: "beec hqme sgwy wzvf", // Sender's email password
  },
});

serviceCtrl.create = async (req, res) => {
  const { fullName, email, phoneNumber, service, date } = req.body;

  const adminMailOptions = {
    from: email, // Sender's email
    to: "Insurance@carehubuae.com", // Admin email
    subject: `New Service Booking: ${fullName} - ${new Date(
      date
    ).toLocaleDateString()}`,
    text: `A new booking has been made by ${fullName} (${email}, ${phoneNumber}).\n\nBooking Details:\n- Service: ${service}\n- Date: ${date}\n\nPlease review the booking and take the necessary action.\n\nBest regards,\nYour Booking System`,
  };

  const customerMailOptions = {
    from: "Insurance@carehubuae.com", // Sender's email
    to: email, // Customer's email
    subject: "Appointment Confirmation",
    text: `Hello ${fullName},
  
        Thank you for booking an appointment with us. Here are the details:
  
        Appointment Date: ${date}
  
        We look forward to seeing you soon!
  
        Regards,
        Carehub`,
  };

  try {
    const data = req.body;
    data.status = "Pending";
    const serviceBooking = await Services.create(data);
    console.log("New Service Booking:", serviceBooking);

    if (serviceBooking) {
      await transporter.sendMail(adminMailOptions); // Admin email
      await transporter.sendMail(customerMailOptions); // Customer email
      res
        .status(200)
        .json({ message: "Appointment booked and confirmation sent!" });
    }
  } catch (error) {
    console.error("Error booking appointment:", error);
    res
      .status(500)
      .json({ message: "Error booking appointment. Please try again later." });
  }
};

serviceCtrl.show = async (req, res) => {
  try {
    const services = await Services.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = serviceCtrl;
