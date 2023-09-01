const express = require("express");
const questionRoute = require("./src/routes.js")
const fs = require("fs")
const app = express()
const port = 3000;

app.use(express.json())

app.get('/', (req, res) => {
  res.send('hello world')
})

app.use('/questions', questionRoute)
app.listen(port, () => console.log('listening on port 3000'))