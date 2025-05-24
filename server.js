const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

const cors = require("cors");
const path = require("path");
const paymentRoutes = require("./routes/payment-routes");

const mailRoutes = require("./routes/mail-routes");
const servicesRoutes = require("./routes/services-routes");
const bloodTestRoutes = require("./routes/bloodTest-routes");

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "carehub/build")));

app.use("/api/payment", paymentRoutes);
app.use("/api/send-email/", mailRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/book-bloodTest", bloodTestRoutes);

app.listen(port, () => {
  connectDB();
  console.log(`Server running successfully on port ${port}`);
});
