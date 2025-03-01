const express = require("express");
const connectDB = require("./config/db");
const redisClient = require("./config/redis");
const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patient.routes");
const doctorRoutes = require("./routes/doctor.routes");
const adminRoutes = require("./routes/admin.routes");
const logger = require("./middlewares/logger");
// const errorHandler = ;

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(logger);

connectDB();

app.use("/auth", authRoutes);
app.use("/patient", patientRoutes);
app.use("/admin", adminRoutes);
app.use("/doctor", doctorRoutes);
app.use(require("./middlewares/errorHandler"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
