const router = require("express").Router();
const { authMiddleware, adminMiddleWare } = require("../middlewares/auth");
const {
  getAllUsers,
  getUserById,
  deleteUser,
  getAllAppointments,
  deleteAppointment,
  downloadReports,
} = require("../controllers/admin.controller");

router.get("/users", authMiddleware, adminMiddleWare, getAllUsers);
router.get("/users/:id", authMiddleware, adminMiddleWare, getUserById);
router.delete("/users/:id", authMiddleware, adminMiddleWare, deleteUser);
router.get(
  "/appointments",
  authMiddleware,
  adminMiddleWare,
  getAllAppointments
);
router.get(
  "/appointments/:id",
  authMiddleware,
  adminMiddleWare,
  deleteAppointment
);
router.get("/reports", authMiddleware, adminMiddleWare, downloadReports);

module.exports = router;
