const config = require("../config/config.js");
const { scryptSync, randomBytes } = require("crypto");
const jwt = require("jsonwebtoken");

exports.checkAuth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.info("Checking token...");
  // console.info(token);
  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.username = decoded.id;
      req.authorized = true;
      console.info("Proceeding...");
      next();
    });
  } else {
    // No token provided, handle as unauthorized (adjust as needed)
    res.status(401).json({ message: "Unauthorized" });
  }
};

// Generate User JWT
exports.generateUserJWT = async (username) => {
  try {
    // start try statement
    return jwt.sign({ id: username }, config.secret, {
      algorithm: "HS256",
      expiresIn: 604800, // 1 week / 7 days
    });
  } catch (err) {
    console.error("Error in generating JWT Token: " + err);
    return false;
  }
};

// Method to set salt and hash the password for a user
exports.hashPass = (password) => {
  // Creating a unique salt for a particular user
  const salt = randomBytes(16).toString("hex");

  // Hashing user's salt and password,
  const getHash = scryptSync(password, salt, 32).toString("hex");

  return {
    hash: getHash,
    salt: salt,
  };
};

// Method to check the entered password is correct or not
exports.checkPass = (password, salt, hash) => {
  const getHash = scryptSync(password, salt, 32).toString("hex");
  return getHash === hash;
};
