const pool = require('../db.js')

const getQuestions = async (req, res) => {
  const product_id = req.query.product_id;

  // Fetch all questions
  const { rows: questionRows } = await pool.query(
    `SELECT * FROM questions WHERE product_id = ${product_id} AND reported = false`
  );

  // Fetch all answers for each question concurrently
  const answersPromises = questionRows.map((question) =>
    pool.query(`SELECT * FROM answers WHERE question_id = ${question.question_id}`)
  );

  const allAnswers = await Promise.all(answersPromises);

  // Map answers to their respective questions
  for (let i = 0; i < questionRows.length; i++) {
    const answerRows = allAnswers[i].rows;
    questionRows[i].answers = {};
    answerRows.forEach((answer) => {
      const { answer_id, body, date, answerer_name, helpfulness } = answer;
      questionRows[i].answers[answer_id] = {
        id: answer_id,
        body: body,
        date: date,
        answerer_name: answerer_name,
        helpfulness: helpfulness,
        photos: []
        };
    });
  }
  // console.log(questionRows);
  res.status(200).send({ product_id: product_id, results: questionRows })
};

// const getQuestions = (req, res) => {
//   const product_id = req.query.product_id
//   const questionsAndAnswers = [];
//   pool.query(`SELECT * FROM questions WHERE product_id = ${product_id} AND reported = false`)
//     .then((results) => {
//       results.rows.map((question) => {
//         question.answers = {}
//         questionsAndAnswers.push(question)
//         pool.query(`SELECT * FROM answers where question_id = ${question.question_id}`)
//           .then((results) => {
//           })
//         })
//         .then(console.log(questionsAndAnswers))
//     })
// }

const getAnswers = (req, res) => {
  // const product_id = req.query.product_id
  pool.query(`SELECT * FROM answers where question_id = ${2} AND reported = false`, (err, results) => {
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
  // insert into questions(product_id, body, date_written, asker_name, asker_email) values (1, 'body', 1693678396, 'name', 'email')
}

module.exports = { getQuestions, getAnswers, markQuestionHelpful, markAnswerHelpful, addQuestion }

// `SELECT questions.*,
//     ( SELECT jsonb_agg(nested_answers) FROM
//       ( SELECT answers.*,
//          ( SELECT json_agg(nested_photos) FROM
//            ( SELECT answers_photos.url FROM answers_photos WHERE answers_photos.answer_id = answers.id
//            ) AS nested_photos
//          ) AS photos FROM answers WHERE answers.question_id = questions.id
//       ) AS nested_answers
//     ) AS answers FROM questions WHERE product_id = ${product_id} and reported = false`