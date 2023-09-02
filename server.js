const express = require("express");
const router = require("./src/routes.js")
const fs = require("fs")
const app = express()
const port = 3000;

app.use(express.json())

app.use('/qa', router)

app.listen(port, () => console.log('listening on port 3000'))