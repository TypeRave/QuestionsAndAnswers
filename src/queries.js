const getQuestionsQuery = `SELECT question_id, question_body, question_date, asker_name, question_helpfulness, reported FROM questions WHERE product_id = $1 AND reported = false`

const getQuestionsAnswersQuery = `SELECT * FROM answers WHERE question_id = $1`

const getQuestionsPhotosQuery = `SELECT * FROM answers_photos WHERE answer_id = $1`

const getAnswersQuery = `SELECT * FROM answers
LEFT JOIN answers_photos ON answers_photos.answer_id = answers.answer_id
where answers.question_id = $1 AND reported = false`

const postQuestionQuery = `INSERT INTO questions(product_id, question_body, question_date, asker_name, asker_email) VALUES ($1, $2, $3, $4, $5)`

const postAnswerQuery = `INSERT INTO answers(question_id, body, answerer_name, answerer_email, date) VALUES ($1, $2, $3, $4, $5)`

const getQuestionsRevised = `SELECT questions.question_id, question_body, question_date, asker_name, question_helpfulness,questions.reported, answers.answer_id, answers.question_id AS answerQuestionId, answers.body, answers.date, answerer_name, answers.helpfulness, url, answers_photos.answer_id AS photoAnswerId FROM questions
LEFT JOIN answers ON answers.question_id = questions.question_id
LEFT JOIN answers_photos ON answers_photos.answer_id = answers.answer_id
WHERE questions.product_id = $1 AND questions.reported = false`

module.exports = { getQuestionsQuery, getQuestionsAnswersQuery, getQuestionsPhotosQuery, getAnswersQuery, postQuestionQuery, postAnswerQuery, getQuestionsRevised }