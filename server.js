const express = require("express");
require('dotenv').config();
const router = require("./src/routes.js")
const path = require("path");
const app = express()
const { PORT } = process.env;
const fs = require('fs');

const fp = path.join(__dirname, './verification.txt')

app.use('/loaderio-8e3f6ce177fe776f0d0e27209eb45922', (req, res) =>{
  let body = fs.readFileSync(fp);
  res.send(body);
})


app.use(express.json())
app.use('/qa', router)
// app.use('/', (req, res) => res.send('connected'))

app.listen(PORT, () => console.log('listening on port 3000'))