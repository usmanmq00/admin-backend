const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModels");

const adminRequireAuth = async (req, res, next) => {
  // Verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET);

    const admin = await Admin.findOne({ user: decoded.user }).select("user");

    if (!admin) {
      return res.status(401).json({ error: "Request is not authorized" });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = adminRequireAuth;
