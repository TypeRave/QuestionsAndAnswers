const { Router } = require("express");
const controller = require('./controllers.js')

const router = Router();

router.get('/questions/', controller.getQuestions);
router.get('/questions/:question_id/answers/', controller.getAnswers);
router.put('/questions/:question_id/helpful/', controller.markQuestionHelpful)

module.exports = router;

//PUT /qa/questions/:question_id/helpful