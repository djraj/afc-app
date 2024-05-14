const config = require("../config/config");

exports.createOrder = async (req, res) => {
  const userId = req.user.id; // Assuming user ID is available from authentication middleware
  const { items } = req.body; // Array of product IDs and quantities

  // Transaction to handle potential database errors
  const connection = await config.db.getConnection();
  await connection.beginTransaction();
  try {
    // 1. Create the order record
    const [orderResult] = await connection.query(
      "INSERT INTO orders (user_id, status) VALUES (?)",
      [userId, "created"]
    );
    const orderId = orderResult.insertId;

    // 2. Insert order items
    const orderItems = items.map((item) => ({
      order_id: orderId,
      product_id: item.productId,
      quantity: item.quantity,
    }));
    await connection.query(
      "INSERT INTO order_items (order_id, product_id, quantity) VALUES ?",
      [orderItems]
    );

    await connection.commit();
    res.json({ message: "Order created successfully", orderId });
  } catch (err) {
    console.error(err);
    await connection.rollback();
    res.status(500).json({ message: "Error creating order" });
  } finally {
    connection.release();
  }
};

exports.getOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const [order] = await config.db.query("SELECT * FROM orders WHERE id = ?", [
      orderId,
    ]);
    if (!order[0]) {
      return null; // Order not found
    }

    const [orderItems] = await config.db.query(
      "SELECT p.name, oi.quantity FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = ?",
      [orderId]
    );

    return { ...order[0], items: orderItems };
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getOrders = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default values for page and limit
  const offset = (page - 1) * limit;
  const userId = req.username;
  console.log("inGetOrders: ",userId)

  try {
    const [orders] = await config.db.query(
      'SELECT * FROM orders WHERE user_id = ? LIMIT ?, ?',
      [userId, offset, limit]
    );

    const totalOrders = await config.db.query(
      'SELECT COUNT(*) AS total FROM orders WHERE user_id = ?',
      [userId]
    );
    const total = totalOrders[0][0].total;

    const orderDetails = await Promise.all(
      orders.map(async order => {
        const [orderItems] = await config.db.query(
          'SELECT p.name, oi.quantity FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = ?',
          [order.id]
        );
        return { ...order, items: orderItems };
      })
    );

    console.log("orders: ", orderDetails);
    return { orders: orderDetails, total, page, limit };
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: 'Internal server error' });
  }
};

