const logger = (req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.url} - ${
      req.user?.role || "Guest"
    }  `
  );
  next();
};

module.exports = logger;
