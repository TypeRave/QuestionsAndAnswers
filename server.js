const express = require("express");
require('dotenv').config();
const router = require("./src/routes.js")
const path = require("path");
const app = express()
const { PORT } = process.env;
const fs = require('fs');

const fp = path.join(__dirname, './verification.txt')

app.use('/loaderio-23bada7c6291776da2a75f6bd2c418c4', (req, res) =>{
  let body = fs.readFileSync(fp);
  res.send(body);
})


app.use(express.json())
app.use('/qa', router)

app.listen(PORT, () => console.log('listening on port 3000'))