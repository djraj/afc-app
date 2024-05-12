const express = require("express");
const config = require("./config/config");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "Welcome to AFC App",
    version: "v1",
  });
});

require(`./routes/user.route`)(app);
require(`./routes/order.route`)(app);
require(`./routes/products.route`)(app);

// Start server
const port = config.SERVER_PORT;
app.listen(port, async () => {
  console.log(`AFC App Server is running on port ${port}`);
});
