const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/index");
const validator = require("validator");
const bcrypt = require("bcrypt");

const createToken = (_id) => {
  return jwt.sign({ _id }, SECRET, { expiresIn: "3d" });
};

// login user
const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    // validation
    if (!identifier || !password) {
      return res.send("All fields must be filled");
    }

    const user = await User.findOne({
      $or: [{ email: identifier }, { contact: identifier }],
    });

    if (!user) {
      return res.send("Incorrect email or phone number");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.send("Incorrect password");
    }

    // create a token
    const accessToken = createToken(user._id);
    const { email, name, contact, birthday, gender } = user;
    res.status(200).json({
      email,
      name,
      contact,
      birthday,
      gender,
      accessToken,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// register user
const registerUser = async (req, res) => {
  try {
    const { email, password, name, contact, birthday, gender } = req.body;

    // validation
    const emailExisting = await User.find({ email: email });
    const contactExists = await User.find({ contact: contact });
    if (emailExisting && emailExisting.length > 0) {
      return res.send("Email Already Exists");
    } else if (contactExists && contactExists.length > 0) {
      return res.send("contact Already Exists");
    }

    if (!email || !password || !name || !contact || !birthday || !gender) {
      return res.send("All fields must be filled");
    }
    if (!validator.isEmail(email)) {
      return res.send("Email is not valid");
    }

    if (!/^\+?[0-9]+$/.test(contact)) {
      return res.send(
        "Phone number must contain only numeric characters and an optional '+' sign at the beginning"
      );
    }

    if (name.length < 2 || name.length > 50) {
      return res.send("Full name must be between 2 and 50 characters");
    }

    if (!/^[a-zA-Z\s'-]+$/.test(name)) {
      return res.send(
        "Full name can only contain letters, spaces, hyphens, and apostrophes"
      );
    }

    if (!validator.isStrongPassword(password)) {
      return res.send(
        "Password not strong enough.Password must meet the following criteria: at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      name,
      contact,
      birthday,
      gender,
      password: hash,
    });

    // create a token
    const accessToken = createToken(user._id);

    res.status(200).json({
      email,
      name,
      contact,
      birthday,
      gender,
      accessToken,
    });
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};

module.exports = {
  loginUser,
  registerUser,
};
