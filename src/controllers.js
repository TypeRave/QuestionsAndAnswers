const pool = require('../db.js')

const getQuestions = (req, res) => {
  const product_id = req.query.product_id
  console.log(product_id)
  pool.query(`SELECT * FROM questions where product_id = ${product_id}`, (err, results) => {
    if (err) {
      throw err;
    } else {
      let response = [];
      results.rows.forEach((obj) => {
        response.push({...obj, date_written: new Date(parseInt(obj.date_written)).toISOString()})
      })
      res.status(200).send(response)
    }
  })
}

const getAnswers = (req, res) => {
  // const product_id = req.query.product_id
  pool.query(`SELECT * FROM answers where question_id = ${1}`, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send(results.rows)
    }
  })
}

const markQuestionHelpful = (req, res) => {
  // console.log(req.params.question_id)
  let id = req.params.question_id
  pool.query(`UPDATE questions SET helpful = helpful + 1 WHERE id = ${id}`, (err, results) => {
    if (err) {
      throw err
    } else {
      res.status(204).send()
    }
  })
}

module.exports = { getQuestions, getAnswers, markQuestionHelpful }