const express = require("express");
require('dotenv').config();
const router = require("./src/routes.js")

const { PORT } = process.env;
const app = express()

console.log(PORT)
app.use(express.json())

app.use('/qa', router)

app.listen(PORT, () => console.log('listening on port 3000'))