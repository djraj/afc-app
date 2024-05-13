const config = require("../config/config.js");

exports.getProducts = async (req, res) => {
  if (!req.authorized) {
    return res.status(200).json({ code: 401, message: "Unauthorized" });
  } else {
    const { page = 1, limit = 10 } = req.query; // Default values for page and limit

    try {
      const offset = (page - 1) * limit; // Calculate offset based on page and limit
      const [rows] = await config.db.query("SELECT * FROM users LIMIT ?, ?", [
        offset,
        limit,
      ]);

      const totalUsers = await config.db.query(
        "SELECT COUNT(*) AS total FROM users"
      );
      const total = totalUsers[0][0].total; // Get total user count

      res.json({ users: rows, total, page, limit }); // Include pagination information
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

exports.addProducts = async (req, res) => {
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
        "INSERT INTO users (username, password, salt, first_name, last_name, email) VALUES (?)",
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

exports.getProduct = async (req, res) => {
  const productId = req.params.productId;

  if (!req.authorized) {
    return res.status(200).json({ code: 401, message: "Token expired!" });
  } else {
    try {
      const [rows] = await config.db.query(
        "SELECT * FROM products WHERE id = ?",
        [productId]
      );
      const product = rows[0];

      if (!product) {
        // Product not found
        return res
          .status(200)
          .json({ code: 401, message: "Product doesn not exist!" });
      }

      res.status(200).json({ code: 200, message: product });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
