const Appointment = require("../models/Appointment");

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctorId: req.User.id,
    }).populate("patientId");
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updatAppointment = async (req, res) => {
  try {
    const { fees, prescription, isDiagnososDone } = req.body;

    const appointments = await Appointment.findById(req.params.id);

    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });
    if (appointment.appointmentDateTime > new Date()) {
      return res
        .status(400)
        .json({ message: "cannot update before Appointment date" });
    }
    appointment.fees = fees;
    appointment.prescription = prescription;
    appointment.isDiagnososDone = isDiagnososDone;
    await appointment.save();
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
