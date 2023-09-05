const pool = require('../db.js')

const getQuestions = async (req, res) => {
  const product_id = req.query.product_id;

  // Fetch all questions
  const { rows: questionRows } = await pool.query(
    `SELECT * FROM questions WHERE product_id = ${product_id} AND reported = false`
  );
  // console.log(questionRows) // array of four questions

  // Fetch all answers for each question concurrently
  const answersPromises = questionRows.map((question) =>
    pool.query(`SELECT * FROM answers WHERE question_id = ${question.question_id}`)
  );
  // console.log(answersPromises) // array of four promises (one per question)
  const allAnswers = await Promise.all(answersPromises);
  // console.log(allAnswers[0].rows) // array of four objects containing array of answers

  const photoPromises = allAnswers.map((answerArr) =>
    answerArr.rows.map((answer) =>
    pool.query(`SELECT * FROM answers_photos WHERE answer_id = ${answer.answer_id}`)
    )
  )
  const allPhotos = await Promise.all(photoPromises.map((photo) => Promise.all(photo)))
  // console.log(allPhotos)


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
        for (var j = 0; j < allPhotos.length; j++) {
          var currentPhotoArr = allPhotos[i][j]?.rows
          // console.log(currentPhotoArr)
          if (currentPhotoArr && currentPhotoArr.length) {
            for (var photoObj of currentPhotoArr) {
              if(answer_id === photoObj.answer_id) {
                questionRows[i].answers[answer_id].photos.push(photoObj.url)
              }
            }
          }
        }
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