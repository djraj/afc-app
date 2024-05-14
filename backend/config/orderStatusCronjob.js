const cron = require('node-cron');
const config = require("../config/config");

// Define an array of possible new statuses (excluding 'created')
const possibleStatuses = ['pending', 'shipped', 'delivered'];

cron.schedule('*/5 * * * *', async () => { // 5 mins
  console.log('Running cron job to update order statuses...');

  try {
    const connection = await config.db.getConnection();
    await connection.beginTransaction(); // Start transaction for safety

    try {
      // Fetch orders with a specific current status (consider filtering by date for efficiency)
      const [results] = await connection.query(
        `SELECT * FROM orders WHERE status = ?`,
        ['created'] // Replace with the current status to update from
      );

      if (!results.length) {
        console.log('No orders found for status update.');
        await connection.commit(); // Commit even if no updates (empty transaction)
        return;
      }

      for (const order of results) {
        // Choose a random new status from the possibleStatuses array
        const newStatus = possibleStatuses[Math.floor(Math.random() * possibleStatuses.length)];
        await connection.query(
          `UPDATE orders SET status = ? WHERE id = ?`,
          [newStatus, order.id]
        );
        console.log(`Order ${order.id} status updated to ${newStatus}`);
      }

      await connection.commit(); // Commit successful updates
    } catch (err) {
      console.error('Error updating order statuses:', err);
      await connection.rollback(); // Rollback on errors
    } finally {
      connection.release(); // Release the connection to the pool
    }
  } catch (err) {
    console.error('Error connecting to database:', err);
  }
}, {
  scheduled: true,
});

console.log('Cron job started successfully.');

module.exports = cron;
