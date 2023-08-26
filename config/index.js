require("dotenv").config();
const PORT = process.env.PORT;
const MONGO_STRING = process.env.MONGO_STRING;
const SECRET = process.env.SECRET;

module.exports = {
  PORT,
  MONGO_STRING,
  SECRET,
};
