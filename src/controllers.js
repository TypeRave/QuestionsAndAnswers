const pool = require('../db.js')

const getQuestions = async (req, res) => {
  const product_id = req.query.product_id;

  // Fetch all questions
  const { rows: questionRows } = await pool.query(
    `SELECT * FROM questions WHERE product_id = ${product_id} AND reported = false`
  );

  // Fetch all answers for each question
  const answersPromises = questionRows.map((question) =>
    pool.query(`SELECT * FROM answers WHERE question_id = ${question.question_id}`)
  );
  // Resolve answer promises
  const allAnswers = await Promise.all(answersPromises);

  // Fetch all photos for answers
  const photoPromises = allAnswers.map((answerArr) =>
    answerArr.rows.map((answer) =>
    pool.query(`SELECT * FROM answers_photos WHERE answer_id = ${answer.answer_id}`)
    )
  )
  // Resolve photos promises
  const allPhotos = await Promise.all(photoPromises.map((photo) => Promise.all(photo)))

  // Map answers to their respective questions
  for (let i = 0; i < questionRows.length; i++) {
    const answerRows = allAnswers[i].rows;
    questionRows[i].answers = {};
    answerRows.forEach((answer) => {
      const { answer_id, body, date, answerer_name, helpfulness } = answer;
      questionRows[i].answers[answer_id] = {
        id: answer_id,
        body: body,
        date: new Date(parseInt(date)),
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

  res.status(200).send({ product_id: product_id, results: questionRows })
};

const getAnswers = async (req, res) => {
  const question_id = req.params.question_id
  const page = req.params.page || 1;
  const count = req.params.count || 5;

  const { rows: answerRows } = await pool.query(`SELECT * FROM answers
    LEFT JOIN answers_photos ON answers_photos.answer_id = answers.answer_id
    where answers.question_id = ${question_id} AND reported = false`)

  const answers = answerRows.map((answer) => {
    const { answer_id, body, date, answerer_name, helpfulness } = answer
    return {
      answer_id: answer_id,
      body: body,
      date: new Date(parseInt(date)),
      answerer_name: answerer_name,
      helpfulness: helpfulness,
      photos: []
    }
  })
    .filter((v,i,a)=>a.findIndex(v2=>(v2.answer_id===v.answer_id))===i)

  answers.forEach((answer) => {
    for (var i = 0; i < answerRows.length; i++) {
      if (answerRows[i].answer_id === answer.answer_id && answerRows[i].url !== null) {
        answer.photos.push(answerRows[i].url)
      }
    }
  })

  const responseObj = {
    question: question_id,
    page: page,
    count: count,
    results: answers.slice(0, count)
  }

  res.status(200).send(responseObj)
}

const markQuestionHelpful = (req, res) => {
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
  console.log(req.body)
  const { body, name, email, product_id, date_written } = req.body
  pool.query(`insert into questions(product_id, question_body, question_date, asker_name, asker_email) values (${product_id}, '${body}', ${date_written}, '${name}', '${email}')`)
  res.status(201).send()
}

module.exports = { getQuestions, getAnswers, markQuestionHelpful, markAnswerHelpful, addQuestion }