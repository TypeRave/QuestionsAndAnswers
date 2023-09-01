const pool = require('../db.js')

const getQuestions = (req, res) => {
  pool.query('SELECT * FROM questions where product_id = 1', (err, results) => {
    if (err) throw err;
    res.status(200).send(results.rows)
  })
}

module.exports = { getQuestions }