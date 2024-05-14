const config = require("../config/config");
const auth = require("../config/auth");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!req.authorized) {
    try {
      // 1. Find user by username
      const [rows] = await config.db.query(
        "SELECT * FROM users WHERE username = ?",
        [username]
      );
      const user = rows[0];

      if (!user) {
        // User not found
        return res
          .status(200)
          .json({ code: 401, message: "Invalid username or password" });
      }

      // 2. Compare hashed passwords
      const match = auth.checkPass(password, user.salt, user.password);
      if (!match) {
        return res
          .status(200)
          .json({ code: 401, message: "Invalid username or password" });
      }

      // 3. Login successful
      // 4. Generate JWT
      const token = await auth.generateUserJWT(user.username, user.password);
      res
        .status(200)
        .json({ code: 200, message: "Login successful", userId: user.username, token: token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(200).json({ code: 200, message: "Login successful" });
  }
};

exports.getUser = async (req, res) => {
  const userId = req.params.userId;

  if (!req.authorized) {
    return res.status(200).json({ code: 401, message: "Token expired!" });
  } else {
    try {
      const [rows] = await config.db.query(
        "SELECT * FROM users WHERE username = ?",
        [userId]
      );
      const user = rows[0];

      if (!user) {
        // User not found
        return res
          .status(200)
          .json({ code: 401, message: "Invalid username or password" });
      }

      res.status(200).json({ code: 200, message: user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

exports.registerUser = async (req, res) => {
  const { username, password, first_name, last_name, email } = req.body;
  const connection = await config.db.getConnection();
  await connection.beginTransaction();
  try {
    // Check if user already exists
    const [rows] = await connection.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    const user = rows[0];

    if (!user) {
      // Hash the password
      let hashpass = auth.hashPass(password);

      // Create the user record
      await connection.query(
        "INSERT INTO users (username, password, salt, first_name, last_name, email) VALUES (?, ?, ?, ?, ?, ?)",
        [username, hashpass.hash, hashpass.salt, first_name, last_name, email]
      );

      await connection.commit();
      res.status(200).json({ message: "User created successfully" });
    } else {
      // User found
      return res.status(200).json({ code: 401, message: "Username exists!" });
    }
  } catch (err) {
    console.error(err);
    await connection.rollback();
    res.status(500).json({ message: "Error creating order" });
  } finally {
    connection.release();
  }
};
