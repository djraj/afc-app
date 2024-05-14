const config = require("../config/config.js");

exports.getProducts = async (req, res) => {
  if (!req.authorized) {
    return res.status(200).json({ code: 401, message: "Unauthorized" });
  } else {
    const { page = 1, limit = 100 } = req.query; // Default values for page and limit

    try {
      const offset = (page - 1) * limit; // Calculate offset based on page and limit
      const [rows] = await config.db.query("SELECT * FROM products LIMIT ?, ?", [
        offset,
        limit,
      ]);

      const totalProducts = await config.db.query(
        "SELECT COUNT(*) AS total FROM products"
      );
      const total = totalProducts[0][0].total; // Get total user count

      res.json({ products: rows, total, page, limit }); // Include pagination information
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

exports.addProducts = async (req, res) => {
  const { productName,productDesc, productPrice } = req.body;
  const connection = await config.db.getConnection();
  await connection.beginTransaction();
  try {
      // Create the product record
      await connection.query(
        "INSERT INTO products (name, description, price) VALUES (?,?,?)",
        [productName,productDesc, productPrice]
      );

      await connection.commit();
      res.status(200).json({ message: "Product created successfully" });

  } catch (err) {
    console.error(err);
    await connection.rollback();
    res.status(500).json({ message: "Error creating product!" });
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
          .json({ code: 401, message: "Product does not exist!" });
      }

      res.status(200).json({ code: 200, message: product });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
