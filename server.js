const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

const port = process.env.PORT || 5000;

app.use(express.json());

app.use(cors());

app.use(express.static(path.join(__dirname, "carehub/build")));

app.get("/api", (req, res) => {
  res.send("Hello world");
});

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "Insurance@carehubuae.com",
    pass: "beec hqme sgwy wzvf", // Consider using environment variables for sensitive data
  },
});

app.post("/api/send-email", async (req, res) => {
  const { fullName, email, phoneNumber, date, service } = req.body;

  const adminMailOptions = {
    from: email, // Sender's email
    to: "Insurance@carehubuae.com", // Recipient's email
    subject: `New Service Booking: ${fullName} - ${new Date(
      date
    ).toLocaleDateString()}`,
    text: `A new booking has been made by ${fullName} (${email}, ${phoneNumber}).\n\nBooking Details:\n- Service: ${service}\n- Date: ${date}\n\nPlease review the booking and take the necessary action.\n\nBest regards,\nYour Booking System`,
  };

  const customerMailOptions = {
    from: "Insurance@carehubuae.com",
    to: email,
    subject: "Appointment Confirmation",
    text: `Hello ${fullName},

    Thank you for booking an appointment with us. Here are the details:

    Appointment Date: ${date}

    We look forward to seeing you soon!

    Regards,
    Carehub`,
  };

  try {
    await transporter.sendMail(adminMailOptions);

    await transporter.sendMail(customerMailOptions);

    res
      .status(200)
      .json({ message: "Appointment booked and confirmation sent!" });
  } catch (error) {
    console.error("Error sending emails:", error);
    res
      .status(500)
      .json({ message: "Error booking appointment. Please try again later." });
  }
});

app.listen(port, () => {
  console.log(`Server running successfully on port ${port}`);
});
