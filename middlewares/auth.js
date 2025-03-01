const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const token = res.headers.authorization?.split(" ")[1];
    if (token) return res.status(403).json({ message: "Token Required" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ message: "Invalid Token" });
      req.user = decoded;
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access Denied" });
      }
      next();
    });
  };
};

const roleMiddleWare = (role) => (req, res, next) => {
  if (req.user.role !== role)
    return res.status(403).json({ message: " Access Forbidden" });
  next();
};

const adminMiddleWare = roleMiddleWare("admin");
const doctorMiddleWare = roleMiddleWare("doctor");
const patientMiddleWare = roleMiddleWare("patient");

module.exports = {
  authMiddleware,
  adminMiddleWare,
  doctorMiddleWare,
  patientMiddleWare,
};
