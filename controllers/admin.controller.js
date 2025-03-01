const User = require("../models/User");
const Appointment = require("../models/Appointment");
const { generateCSV } = require("../Services/csvGenerator");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const users = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not Found" });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patientId")
      .populate("doctorId");
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const appointments = await Appointment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Appointment Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.generateReports = async (req, res) => {
  try {
    const doctors = await User.countDocuments({ role: "doctor" });
    const patients = await User.countDocuments({ role: "patient" });
    const appointments = await Appointment.countDocuments();

    const csv = generateCSV({ doctors, patients, appointments });
    res.attachment("report.csv");
    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({ message: "ServerError" });
  }
};
