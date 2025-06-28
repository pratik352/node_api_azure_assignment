const express = require('express');
const sql = require('mssql');
require('dotenv').config();
var cors = require("cors")

const app = express();
const port = 8080;

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: { encrypt: true, enableArithAbort: true }
};

app.use(cors())

app.get('/api/employees', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Employees`;
    res.json(result.recordset);
  } catch (err) {
    console.error("DB error:", err.message);
    res.status(500).send("Error fetching data");
  }
});

app.get("/", (req, res) => {
  res.json({"hello": "hello"})
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
