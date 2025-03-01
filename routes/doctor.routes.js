const router = require("express").Router();
const { authMiddleware, doctorMiddleWare } = require("../middlewares/auth");
const {
  updateAppointments,
  getAppointments,
} = require("../controllers/doctor.controller");

router.get("/appointments", authMiddleware, doctorMiddleWare, getAppointments);
router.put(
  "/appointments/:id",
  authMiddleware,
  doctorMiddleWare,
  updateAppointments
);

module.exports = router;
