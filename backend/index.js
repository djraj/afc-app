const express = require("express");
const cors = require("cors");
const config = require("./config/config");
const db = require("./config/initiateDB");
const bodyParser = require("body-parser");

const corsOptions = {
  origin: 'http://localhost:3000'
};

const app = express();
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json({}));


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
const port = config.port;
app.listen(port, async () => {
  db.initiateTables();
  console.log(`AFC App Server is running on port ${port}`);
});
