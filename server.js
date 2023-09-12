const express = require("express");
require('dotenv').config();
const router = require("./src/routes.js")
const path = require("path");
const app = express()
const { PORT } = process.env;
const fs = require('fs');
// const compression = require('compression')
const mcache = require('memory-cache')

app.use(express.json())

// COMPRESSION

// app.use(compression())

// CACHE

var cache = (duration) => {
  return (req, res, next) => {
    let key = req.url
    let cachedBody = mcache.get(key)
    if (cachedBody) {
      res.status(200).send(JSON.parse(cachedBody))
      return
    } else {
      res.sendResponse = res.send
      res.send = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body)
      }
      next()
    }
  }
}

const fp = path.join(__dirname, './verification.txt')

app.use('/loaderio-8e3f6ce177fe776f0d0e27209eb45922', (req, res) =>{
  let body = fs.readFileSync(fp);
  res.send(body);
})

app.use('/qa', cache(10), router)
app.use('/', (req, res) => res.send('connected'))

app.listen(PORT, () => console.log(`listening on port ${PORT}`))