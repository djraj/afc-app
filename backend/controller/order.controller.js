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
      'INSERT INTO orders (user_id) VALUES (?)',
      [userId]
    );
    const orderId = orderResult.insertId;

    // 2. Insert order items
    const orderItems = items.map((item) => ({
      order_id: orderId,
      product_id: item.productId,
      quantity: item.quantity,
    }));
    await connection.query('INSERT INTO order_items (order_id, product_id, quantity) VALUES ?', [orderItems]);

    await connection.commit();
    res.json({ message: 'Order created successfully', orderId });
  } catch (err) {
    console.error(err);
    await connection.rollback();
    res.status(500).json({ message: 'Error creating order' });
  } finally {
    connection.release();
  }
};


exports.getOrder = async (req, res) => {
    const returnObj = req.body;
    console.log("Received data: ", returnObj);
    
  };

exports.getOrders = async (req, res) => {
  const returnObj = req.body;
  console.log("Received data: ", returnObj);
  
};
