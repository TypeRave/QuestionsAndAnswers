SELECT questions.question_id, answers.answer_id, answers_photos.id FROM questions
LEFT JOIN answers ON answers.question_id = questions.question_id
LEFT JOIN answers_photos ON answers_photos.answer_id = answers.answer_id
WHERE questions.product_id = 1 AND questions.reported = false