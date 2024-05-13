const config = require("./config");

exports.initiateTables = async () => {
  const userTable = `CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
  )`;

  const productTable = `CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL
  )`;

  const orderTable = `CREATE TABLE IF NOT EXISTS orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    status ENUM('created', 'pending', 'shipped', 'delivered') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
  )`;

  const orderItemTable = `CREATE TABLE IF NOT EXISTS order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    product_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id),
    quantity INT NOT NULL
  )`;

  try {
    await config.db.query(userTable);
    await config.db.query(productTable);
    await config.db.query(orderTable);
    await config.db.query(orderItemTable);
    console.log('Tables created successfully');
  } catch (err) {
    console.error('Error creating tables:', err);
  }
};
