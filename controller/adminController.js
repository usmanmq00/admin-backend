const Admin = require("../models/adminModels");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/index");
const bcrypt = require("bcrypt");
const validator = require("validator");

const createToken = (user) => {
  return jwt.sign({ user }, SECRET, { expiresIn: "3d" });
};

// login admin
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.send("All fields must be filled");
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.send("Incorrect email");
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.send("Incorrect password");
    }

    // create a token
    const accessToken = createToken(admin.user);

    res.status(200).json({
      email,
      accessToken,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// register admin
const registerAdmin = async (req, res) => {
  try {
    const { email, password, user } = req.body;

    // validation
    const emailExisting = await Admin.find({ email: email });
    if (emailExisting && emailExisting.length > 0) {
      return res.send("Email Already Exists");
    }

    if (!email || !password) {
      return res.send("All fields must be filled");
    }
    if (!validator.isEmail(email)) {
      return res.send("Email is not valid");
    }

    if (!validator.isStrongPassword(password)) {
      return res.send(
        "Password not strong enough.Password must meet the following criteria: at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const admin = await Admin.create({
      email,
      password: hash,
      user: "admin",
    });

    // create a token
    const accessToken = createToken(admin.user);

    res.status(200).json({
      email,
      accessToken,
      user,
    });
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};

module.exports = { loginAdmin, registerAdmin };
