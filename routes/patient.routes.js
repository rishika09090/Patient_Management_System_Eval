const router = require("express").Router();
const { authMiddleware, patientMiddleWare } = require("../middlewares/auth");
const {
  bookAppointment,
  getAppointments,
  updateAppointment,
  requestDeleteAppointment,
} = require("../controllers/patient.controller");

router.post(
  "/appointments",
  authMiddleware,
  patientMiddleWare,
  bookAppointment
);
router.get("/appointments", authMiddleware, patientMiddleWare, getAppointments);
router.put(
  "/appointments/:id",
  authMiddleware,
  patientMiddleWare,
  updateAppointment
);
router.post(
  "/appointments/request-delete/:id",
  authMiddleware,
  patientMiddleWare,
  requestDeleteAppointment
);

module.exports = router;
