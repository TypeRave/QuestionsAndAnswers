const pool = require('../db.js')

const getQuestions = (req, res) => {
  const product_id = req.query.product_id
  const resultObj = { product_id: product_id, results: []}
  pool.query(`
      SELECT
        questions.*,
          (
            SELECT jsonb_agg(nested_answers)
            FROM (
              SELECT
               answers.*
              FROM answers
              WHERE answers.question_id = questions.id
            ) AS nested_answers
          ) AS answers
      FROM questions WHERE product_id = ${product_id}`,
      (err, results) => {
    if (err) {
      throw err;
    } else {
      resultObj.results = results.rows
      res.status(200).send(resultObj)
    }
  })
}

const getAnswers = (req, res) => {
  // const product_id = req.query.product_id
  pool.query(`SELECT * FROM answers where question_id = ${1} AND reported = false`, (err, results) => {
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
    if (err) { throw err }
    else { res.status(204).send() }
  })
}

const markAnswerHelpful = (req, res) => {
  let id = req.params.answer_id;
  pool.query(`UPDATE answers SET helpful = helpful + 1 WHERE id = ${id}`, (err, results) => {
    if (err) { throw err }
    else { res.status(204).send() }
  })
}

const addQuestion = (req, res) => {
  // console.log(req.body)
  const { body, name, email, product_id, date_written } = req.body
  // const date = Math.floor(Date.now()/1000)
  // console.log(date)
  // insert into questions(product_id, body, date_written, asker_name, asker_email)                              values (1, 'body', 1693678396, 'name', 'email')
}

module.exports = { getQuestions, getAnswers, markQuestionHelpful, markAnswerHelpful, addQuestion }