const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

const envPath = path.join(__dirname, "../.env");
console.log(envPath)
const envFile = fs.readFileSync(envPath, "utf-8");

const envRegex = /(.*)=(.*)/gm;
const env = {};


let match;
while ((match = envRegex.exec(envFile)) !== null) {
  env[match[1]] = match[2];
}

const pool = mysql.createPool({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

module.exports = {
  url: env.API_URL,
  port: env.SERVER_PORT || 4000,
  version: env.API_VERSION,
  db: pool,
  dbName: env.DB_NAME,
  secret: env.JWT_SECRET,
};
