const express = require("express");
const config = require("./config/config");
const db = require("./config/initiateDB");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (res) => {
  res.status(200).json({
    message: "Welcome to AFC App",
    version: config.version,
  });
});

require(`./routes/user.route`)(app);
require(`./routes/order.route`)(app);
require(`./routes/products.route`)(app);

// Start server
const port = config.SERVER_PORT;
app.listen(port, async () => {
  db.initiateTables();
  console.log(`AFC App Server is running on port ${port}`);
});
